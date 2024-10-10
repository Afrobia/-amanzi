import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserCommand } from './create-user.commands';
import { User } from '../domain/user';
import { throwError } from 'rxjs';


@Injectable()
export class UsersService {

  create(createUser: CreateUserCommand): User {
    this.validateAge(createUser)

    const newUser = new User()
    newUser.setName(createUser.name)
    newUser.setEmail(createUser.email)
    newUser.setPassword(createUser.password)

    return newUser
  }

  private validateAge(user: CreateUserCommand){
    const yearNow = new Date().getFullYear();
    const age = yearNow - user.yearOfBirth
    const MINIMUM_AGE = 16

    if(age <= MINIMUM_AGE){
      throw new Error("Cadastro invalido, idade mínima não atingida")
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
