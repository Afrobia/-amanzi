import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';


export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsNumber()
    @IsNotEmpty()
    weight: number;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    state: string;

}
