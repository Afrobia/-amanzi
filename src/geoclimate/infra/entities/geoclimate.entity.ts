import { IsUUID } from "class-validator";
import { UserEntity } from "../../../users/infrastructure/typeOrm/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('location')
export class LocationEntity {
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;
  
    @Column()
    city: string;
  
    @Column()
    state: string;

    @OneToOne(() => UserEntity, user => user.location, { onDelete: 'CASCADE' })
    user: UserEntity;
}
