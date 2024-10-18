import { PartialType, ApiProperty } from "@nestjs/swagger";
import { IsStrongPassword, IsNotEmpty } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

export class DeleteUserDto extends PartialType(CreateUserDto) {
    @IsStrongPassword()
    @IsNotEmpty()
    @ApiProperty()
    password: string;
}