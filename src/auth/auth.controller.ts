import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './loginDto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @HttpCode(HttpStatus.OK)
  @Post('auth/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.singIn(loginDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Body() loginDto: LoginDto) {
    return this.authService.singIn(loginDto);
  }
}

