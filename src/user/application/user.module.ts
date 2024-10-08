import { DynamicModule, Module, Type } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from '../http/user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  static withInfrastructure(infrastructureModule: Type | DynamicModule) {
  return {
    module: UserModule,
    imports: [infrastructureModule], 
  };
}}
