import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateLocationDto {
    @IsString()
    @ApiProperty()
    city: string;
  
    @IsString()
    @ApiProperty()
    state: string;
}
