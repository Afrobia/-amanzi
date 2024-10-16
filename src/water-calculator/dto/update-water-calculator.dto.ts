import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString } from 'class-validator';
import { CreateUserDto } from '../../users/http/dto/create-user.dto';


export class UpdateCalculatorDto extends PartialType(CreateUserDto) {
    @IsPositive()
    @IsNumber()
    weight: number;

}
