import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Inject,
  Get,
  Param,
  Delete,
  Patch
} from '@nestjs/common';
import { UsersService } from '../application/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../domain/model/user';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto):Promise<User> {
    return this.usersService.createOrFind(createUserDto)
  }
  
  @Get()
  async findAllUser():Promise<User[]>{
    return await this.usersService.findAllUsers()
  }

  @Get(':email')
  async findUserByEmail(@Param('email') email: string):Promise<User>{
    return await this.usersService.findUserByEmail(email)
  }

  @Patch(':weight')
  async updateWeight( @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.modifyWeight(updateUserDto);
  }

  @Delete(':email')
  async deleteUser(@Param('email') email: string){
   await this.usersService.deleteUser(email)
   
   return "Usuário removido"
  }
}
