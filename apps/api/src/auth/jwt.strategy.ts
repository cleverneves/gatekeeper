import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../users/users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userRepository: UserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'super-secret',
        });
    }

    async validate(payload: { id: number }) {
        const user = await this.userRepository.findById(payload.id);
        if (!user || !user.status) {
            throw new UnauthorizedException('Usuário inválido ou inativo');
        }

        return user;
    }
}