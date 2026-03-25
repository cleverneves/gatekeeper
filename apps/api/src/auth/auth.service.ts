import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { UserRepository } from '../users/users.repository';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/user.entity';
import { UserRole } from '../users/user-roles.enum';
import { CredentialsDto } from 'src/users/dto/credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async signUp(createUserDto: CreateUserDto): Promise<User> {
        return await this.userRepository.createUser(createUserDto, UserRole.USER);
    }

    async signIn(credentialsDto: CredentialsDto) {
        const user = await this.userRepository.checkCredentials(credentialsDto);

        if (user === null) {
            throw new UnauthorizedException('Credenciais inválidas');
        }
    }
}
