import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LoginDto } from './auth/loginDto';

@Controller()
@ApiTags('Home')
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}
  
  @Get()
  @ApiOperation({summary: "Boas-vindas "})
  getHello(): string {
    return this.appService.getHello();
  }
}
