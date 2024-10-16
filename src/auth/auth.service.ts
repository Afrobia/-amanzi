import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/domain/model/user';
import { UsersService } from '../users/application/users.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from "bcrypt"
import { LoginDto } from './loginDto';

@Injectable()
export class AuthService {
  constructor(
    @Inject()
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async singIn(longinDto: LoginDto) {
    const {email, password} = longinDto
    const user = await this.validateUser(email, password)
    return this.login(user) 
  }

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && (await bcrypt.compare(pass, user.getPassword()))) {
      return user;
    };
    throw new UnauthorizedException('Usuário não autorizado')
  }

  async login(user: User) {
    const payload = { username: user.getName(), sub: user.getId() };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
