import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';


export class AnonIntakeDto {
    @IsPositive()
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
