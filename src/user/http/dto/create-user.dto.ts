import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({ message: 'Campo de nome obrigatório' })
    name: string;
  
    @IsEmail({}, { message: 'Email inválido' })
    @IsNotEmpty({ message: 'Campo de email obrigatório' })
    email: string;

    @IsStrongPassword()
    @IsNotEmpty()
    password: string
  }