import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../users/users.repository';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/user.entity';
import { UserRole } from '../users/user-roles.enum';
import { CredentialsDto } from 'src/users/dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private jwtService: JwtService,
    ) { }

    async signUp(createUserDto: CreateUserDto): Promise<User> {
        return await this.userRepository.createUser(createUserDto, UserRole.USER);
    }

    async signIn(credentialsDto: CredentialsDto) {
        const user = await this.userRepository.checkCredentials(credentialsDto);

        if (user === null) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const jwtPayload = {
            id: user.id,
        };

        const token = this.jwtService.sign(jwtPayload);

        return { token };
    }
}
