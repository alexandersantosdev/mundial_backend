import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @IsString({ message: 'Nome do usuário é obrigatório e deve ser um texto válido' })
    name: string;
    @IsEmail({ allow_display_name: true }, { message: 'Email do usuario é obrigatório e deve ser um email válido' })
    email: string;
    @IsString({ message: 'Senha é obrigatória' })
    password: string;
}
