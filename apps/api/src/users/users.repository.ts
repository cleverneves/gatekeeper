
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

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private repo: Repository<User>,
    ) { }

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