import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Inject,
  Get,
  Param
} from '@nestjs/common';
import { USERS_SERVICE_TOKEN, UsersService } from '../application/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../domain/user';


@Controller('users')
export class UsersController {
  constructor(
    @Inject(USERS_SERVICE_TOKEN)
    private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto):Promise<User> {
    return this.usersService.createOrFind(createUserDto)
  }
  
  @Get(':email')
  async findUserByEmail(@Param('email') email: string):Promise<User>{
    return this.usersService.findUserByEmail(email)
  }

}
