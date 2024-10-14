import { Injectable } from '@nestjs/common';
import { User } from '../../domain/model/user';
import { UserEntity } from './user.entity';

@Injectable()
export class UserMapper {
  toModel(entity: UserEntity): User {
    const model = new User()
      model.setId(entity.id)
      model.setName(entity.name)
      model.setEmail(entity.email)
      model.setPassword(entity.password)
      model.setWeight(entity.weight)
      model.setWaterIntake(entity.waterIntake)
    return model
  }

  toEntity(model: User): UserEntity {
    const entity = new UserEntity();
    entity.id = model.getId()
    entity.name = model.getName();
    entity.email = model.getEmail();
    entity.password = model.getPassword()
    entity.weight = model.getWeight()
    entity.waterIntake =model.getWaterIntake()
    return entity;
  }
}