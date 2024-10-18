import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsNumber, IsPositive, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateWeightDto extends PartialType(CreateUserDto) {
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  weight: number;

  @IsStrongPassword()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
