import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  @IsUUID()
  id: string;

  @Column()
  @IsString({ message: 'nome deve ser uma string.' })
  @IsNotEmpty()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;
}
