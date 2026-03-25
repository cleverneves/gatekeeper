import {
    IsEmail,
    IsNotEmpty,
    MaxLength,
    MinLength,
    Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Match } from '../decorators/match.decorator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Informe um endereço de email', })
    @IsEmail({}, { message: 'Informe um endereço de email válido', },)
    @MaxLength(200, { message: 'O endereço de email deve ter menos de 200 caracteres', })
    @Transform(({ value }) => value.trim().toLowerCase())
    email: string;

    @IsNotEmpty({ message: 'Informe o nome do usuário', })
    @MaxLength(200, { message: 'O nome deve ter menos de 200 caracteres', })
    @Transform(({ value }) => value.trim())
    name: string;

    @IsNotEmpty({ message: 'Informe uma senha', })
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres', })
    @MaxLength(100, { message: 'A senha deve ter no máximo 100 caracteres', })
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/, { message: 'A senha deve conter pelo menos uma letra maíuscula, uma letra minúscula, um número e um caractere especial', })
    password: string;

    @IsNotEmpty({ message: 'Informe a confirmação de senha', })
    @MinLength(6, { message: 'A confirmação de senha deve ter no mínimo 6 caracteres', })
    @Match('password', { message: 'As senhas não coincidem', })
    passwordConfirmation: string;
}