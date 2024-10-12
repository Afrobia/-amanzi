import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepositoryInterface } from '../../application/ports/user-repository';
import { UserEntity } from './user.entity';
import { User } from '../../domain/user';
import * as bcrypt from 'bcrypt';
import { UserMapper } from './user.mapper';


@Injectable()
export class UserRepository implements UserRepositoryInterface {
  private readonly users = new Map<string, UserEntity>();

  constructor(
    private readonly userMapper: UserMapper,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>) {}
    
  async registerUser(userData: User): Promise<User> {
    const persistenceModel = await this.userMapper.toEntity(userData);
    this.users.set(persistenceModel.id, persistenceModel);
    const newEntity = this.users.get(persistenceModel.id);
    this.userRepository.save(newEntity)
    return await this.userMapper.toModel(newEntity)
  }


  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async getAll(): Promise<User[]> {
    /* const entities = Array.from(this.users.values());
    return Promise.all(entities.map((item) => this.userMapper.forDomain(item)) */;
  return
  }

  async findEmail(email: string): Promise<User| null> {
    const entities = Array.from(this.users.values());
    const userFound = entities.find((item) => item.email === email);
    if (!userFound) return null;
    return this.userMapper.toModel(userFound);
  }

  async deleteUser(email: string) {
    return
  }  
}
