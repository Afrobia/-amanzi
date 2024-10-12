import { ForbiddenException, Inject } from '@nestjs/common';
import { UpdateUserDto } from '../http/dto/update-user.dto';
import { UserServiceInterface } from './ports/user-service.interface';
import { USER_REPO_TOKEN, UserRepositoryInterface } from './ports/user-repository';
import { CreateUserDto } from '../http/dto/create-user.dto';
import { User } from '../domain/user';


export class UsersService implements UserServiceInterface{
  constructor(
    @Inject(USER_REPO_TOKEN)
    private readonly userRepository:UserRepositoryInterface){}
  
  async createOrFind(createUser: CreateUserDto) {
    this.validateAge(createUser)
    const user = await this.findOne(createUser.email)

    if(user){
       throw new Error('Usuário já cadastrado')
    }
    return await this.create(createUser)
  }

  async create(createUser: CreateUserDto): Promise<User> {
    const newUser = new User()
    newUser.setName(createUser.name)
    newUser.setEmail(createUser.email)
    newUser.setPassword(createUser.password)
    return this.userRepository.registerUser(newUser)
  }

  private validateAge(user: CreateUserDto){
    const yearNow = new Date().getFullYear();
    const age = yearNow - user.yearOfBirth
    const MINIMUM_AGE = 16

    if(age <= MINIMUM_AGE){
      throw new ForbiddenException("Cadastro invalido, idade mínima não atingida")
    }
  }

  async list():Promise<User[]>{
    return ;
  }

  findOne(email: string): Promise<User | null> {
    const userFound = this.userRepository.findEmail(email)
    if(!userFound){
      return null
    }
    return userFound
  }

  findUserByEmail(email:string): Promise<User>{
    const user = this.findOne(email)
    if(!user){
      throw new ForbiddenException("Email não cadastrado")
    }
    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

export const USERS_SERVICE_TOKEN = Symbol()