import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLocationDto extends PartialType(CreateUserDto) {
  
  @IsString()
  @ApiProperty()
  city: string;
  
  @IsString()
  @ApiProperty()
  state: string;
}
