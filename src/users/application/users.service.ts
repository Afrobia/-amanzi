import {
  ForbiddenException, Inject, Injectable,NotFoundException,
} from '@nestjs/common';
import { UserServiceInterface } from '../domain/service/user-service.interface';
import { USER_REPO_TOKEN, UserRepositoryInterface} from './ports/user-repository';
import { CreateUserDto } from '../http/dto/create-user.dto';
import { User } from '../domain/model/user';

@Injectable()
export class UsersService implements UserServiceInterface {
  constructor(
    @Inject(USER_REPO_TOKEN)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async createOrFind(createUser: CreateUserDto) {
    this.validateAge(createUser);
    const user = await this.userRepository.findEmail(createUser.email);
    if (user) {
      throw new ForbiddenException('Cadastro inválido, usuário já cadastrado');
    } 

    return await this.create(createUser)
  }

  async create(createUser: CreateUserDto): Promise<User> {
    const newUser = new User();
    newUser.setName(createUser.name);
    newUser.setEmail(createUser.email);
    newUser.setPassword(createUser.password);
    return this.userRepository.registerUser(newUser);
  }

  private validateAge(user: CreateUserDto) {
    const yearNow = new Date().getFullYear();
    const age = yearNow - user.yearOfBirth;
    const MINIMUM_AGE = 16;

    if (age <= MINIMUM_AGE) {
      throw new ForbiddenException(
        'Cadastro invalido, idade mínima não atingida',
      );
    }
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findEmail(email);
    if (!user) {
      throw new NotFoundException('Email não cadastrado');
    }
    return user;
  }

  async modifyWeight(email:string,weight: number, waterIntake:number):Promise<User>{
    
    const user = await this.findUserByEmail(email)
    user.setWeight(weight)
    user.setWaterIntake(waterIntake)
    this.userRepository.modifySave(user)
    return user
  }

  async deleteUser(email: string) {
    await this.userRepository.deleteUser(email);
  }
}
