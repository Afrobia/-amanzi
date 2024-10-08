import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../http/dto/create-user.dto';
import { User } from '../domain/user.model';
import { UserEntity } from '../infrastructure/typeorm/entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  /* async register(userData: CreateUserDto): Promise<User> {
    const user = new User(userData.name, userData.email, userData.password)

    const createdUser = await this.userRepository.create(user as DeepPartial<UserEntity>);
    return 
  }


  async getUserByEmail(email: string): Promise<User | null> {
    
    await this.userRepository.findByEmail(email);
  } */

}


