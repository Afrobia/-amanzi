import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { MaxLength, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLocationDto extends PartialType(CreateUserDto) {
  
  @IsString()
  @ApiProperty()
  city: string;
  
  @IsString()
  @MaxLength(2,{ message: 'Deve ter no máximo 2 caracteres' })
  @ApiProperty()
  state: string;
  
  @IsStrongPassword()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
