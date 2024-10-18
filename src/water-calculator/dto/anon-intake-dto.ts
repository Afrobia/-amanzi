import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength } from 'class-validator';


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
    @MaxLength(2, { message: 'Deve ter no máximo 2 caracteres' })
    @ApiProperty()
    state: string;
}
