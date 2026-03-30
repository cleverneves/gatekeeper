
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from './user-roles.enum';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialsDto } from './dto/credentials.dto';
import { FindUsersQueryDto } from './dto/find-users-query.dto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private repo: Repository<User>,
    ) { }

    async findUsers(
        queryDto: FindUsersQueryDto,
    ): Promise<{ users: User[]; total: number }> {
        queryDto.status = queryDto.status === undefined ? true : queryDto.status;
        queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
        queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;

        const { email, name, status, role } = queryDto;
        const query = this.createQueryBuilder('user');
        query.where('user.status = :status', { status });

        if (email) {
            query.andWhere('user.email ILIKE :email', { email: `%${email}%` });
        }

        if (name) {
            query.andWhere('user.name ILIKE :name', { name: `%${name}%` });
        }

        if (role) {
            query.andWhere('user.role = :role', { role });
        }
        query.skip((queryDto.page - 1) * queryDto.limit);
        query.take(+queryDto.limit);
        query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
        query.select(['user.name', 'user.email', 'user.role', 'user.status']);

        const [users, total] = await query.getManyAndCount();

        return { users, total };
    }

    async createUser(
        createUserDto: CreateUserDto,
        role: UserRole,
    ): Promise<User> {

        const { email, name, password } = createUserDto;
        const salt = await bcrypt.genSalt()
        const hashedPassword = await this.hashPassword(password, salt);

        const user = this.repo.create({
            email,
            name,
            role,
            status: true,
            confirmationToken: crypto.randomBytes(32).toString('hex'),
            salt,
            password: hashedPassword,
        });

        try {
            return await this.repo.save(user);
        } catch (error) {
            if (error.code.toString() === '23505') {
                throw new ConflictException('Endereço de email já está em uso');
            } else {
                throw new InternalServerErrorException(
                    'Erro ao salvar o usuário no banco de dados',
                );
            }
        }
    }

    async findById(id: number): Promise<User | null> {
        return this.repo.findOne({
            where: { id },
            select: ['id', 'name', 'email', 'status', 'role'],
        });
    }

    async checkCredentials(credentialsDto: CredentialsDto): Promise<User | null> {
        const { email, password } = credentialsDto;
        const user = await this.repo.findOne({
            where: { email, status: true },
        });

        if (!user) return null;

        const isValidPassword = await user.checkPassword(password);

        return isValidPassword ? user : null;
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}