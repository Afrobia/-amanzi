import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateWeightDto extends PartialType(CreateUserDto) {
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  weight: number;
}
