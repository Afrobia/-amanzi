import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { User } from 'src/user/domain/user.model';

@Injectable()
export class UserMapper {
  forDomain(userEntity: UserEntity): User {
    const user = new User(
      userEntity.name,
      userEntity.email,
      userEntity.password,
    );

    return user;
  }

  async forPersistence(user: User): Promise<UserEntity> {
    const entity = new UserEntity();
    entity.id = user.getId();
    entity.name = user.getName();
    entity.email = user.getEmail();
    entity.password = user.getPassword();

    return entity;
  }
}
