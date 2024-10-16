import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { config } from 'dotenv';
import { RepositoryModule } from '../db/repository.persistence.module';
import { UsersService } from '../users/application/users.service';
import { UsersModule } from '../users/application/users.module';


config();

@Module({
    imports: [RepositoryModule,UsersModule, 
        JwtModule.register({
        global: true,
        secret: process.env.JWS_SECRET,
        signOptions: { expiresIn: '60s' },
      }),
    ],
    providers: [AuthService,UsersService,JwtService],
    controllers: [AuthController],
    exports:[AuthService]
})
export class AuthModule {}
