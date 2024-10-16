import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
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
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  city: string;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  state: string;

}
