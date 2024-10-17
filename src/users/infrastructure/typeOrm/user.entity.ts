import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";;
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
    
    @Column( {type: 'decimal', precision: 10, scale: 2, nullable: true })
    weight:number | null;

    @Column( {type: 'decimal', precision: 10, scale: 2, nullable: true })
    waterIntake:number| null;


    @Column({nullable: true })
    @IsString()
    city: string | null;

    @Column({nullable: true })
    @IsString()
    state: string | null;

}

