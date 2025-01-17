import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepositoryInterface } from '../../application/ports/user-repository';
import { UserEntity } from './user.entity';
import { User } from '../../domain/model/user';
import { UserMapper } from './user.mapper';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  private readonly users = new Map<string, UserEntity>();

  constructor(
    private readonly userMapper: UserMapper,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async registerUser(userData: User): Promise<User> {
    const persistenceModel = this.userMapper.toEntity(userData);
    this.users.set(persistenceModel.id, persistenceModel);
    const newEntity = this.users.get(persistenceModel.id);
    this.userRepository.save(newEntity);

    return this.userMapper.toModel(newEntity);
  }


  async getAllUsers(): Promise<User[]> {
    const entities = await this.userRepository.find();
    return Promise.all(entities.map((item) => this.userMapper.toModel(item)));
  }

  async findEntityByEmail(email: string): Promise<UserEntity | null> {
    const entity = await this.userRepository.findOneBy({ email });
    if (!entity) {
      return null;
    }
    return entity;
  }

  async findEmail(email: string): Promise<User | null> {
    const entity = await this.findEntityByEmail(email)
      if(!entity){
        return null
      }
    return this.userMapper.toModel(entity);
  }

  async modifySave(user: User): Promise<User> {
    const entityModify = await this.userRepository.save( this.userMapper.toEntity( user));
    return this.userMapper.toModel(entityModify);
  }

  async deleteUser(email: string) {
    const entity = await this.findEntityByEmail(email);
    await this.userRepository.delete(entity);
  }
}
