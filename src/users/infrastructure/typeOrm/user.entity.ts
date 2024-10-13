import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    id: string;

    @Column()
    @IsString({ message: 'nome deve ser uma string.' })
    @IsNotEmpty()
    name: string;

    @Column({ unique: true })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column()
    password: string;
    
    @Column()
    weight:number;

}