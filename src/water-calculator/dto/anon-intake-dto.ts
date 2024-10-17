import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';


export class AnonIntakeDto {
    @IsPositive()
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
