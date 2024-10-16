import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from '../application/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../domain/model/user';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({summary: "Cadastra um novo usuário"})
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto):Promise<string> {
    await  this.usersService.createOrFind(createUserDto)
    return "Usuário cadastrado com sucesso"
  }

  @Get(':email')
  @ApiOperation({summary: "Encontra o usuário por email"})
  async findUserByEmail(@Param('email') email: string):Promise<User>{
    return await this.usersService.findUserByEmail(email)
  }

  @Delete(':email')
  @ApiOperation({summary: "Deleta o usuário"})
  async deleteUser(@Param('email') email: string){
   await this.usersService.deleteUser(email)
   return "Usuário removido"
  }
}
