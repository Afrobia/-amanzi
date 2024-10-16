import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  weight: number;
}
