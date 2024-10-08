
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../application/user.repository';
import { UserEntity } from '../entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';
import { User } from '../../../../user/domain/user.model';


@Injectable()
export class TypeOrmUserRepository extends UsersRepository {
  private readonly users = new Map<string, UserEntity>();

  constructor(private readonly userMapper: UserMapper) {
    super();
  }

  async create(user: User): Promise<User> {
    const persistenceModel = await this.userMapper.forPersistence(user);
    this.users.set(persistenceModel.id, persistenceModel);
    const newEntity = this.users.get(persistenceModel.id);
    
    return this.userMapper.forDomain(newEntity);
  }

  findById(id: number): Promise<User | null> {
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: string): Promise<User | null> {
    const entities = Array.from(this.users.values());
    const userFound = entities.find((item) => item.email === email);
    if (!userFound) return null;
    return this.userMapper.forDomain(userFound);
    
  }

  }
 

