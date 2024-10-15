import { IsUUID } from "class-validator";
import { UserEntity } from "../../../users/infrastructure/typeOrm/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LocationEntity {
    @PrimaryGeneratedColumn()
    @IsUUID()
    id: string;
  
    @Column()
    city: string;
  
    @Column()
    state: string;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    averageTemperature: number;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    relativeHumidity: number;

    @OneToOne(() => UserEntity, user => user.location, { onDelete: 'CASCADE' })
    user: UserEntity;
}
