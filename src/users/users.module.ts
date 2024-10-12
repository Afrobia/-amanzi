import { Module} from '@nestjs/common';
import { USERS_SERVICE_TOKEN, UsersService } from './application/users.service';
import { UsersRepositoryModule } from './infrastructure/typeOrm/user-repository.module';
import { UsersController } from './http/users.controller';


@Module({
  imports:[UsersRepositoryModule],
  controllers: [ UsersController],
  providers: [{
    provide: USERS_SERVICE_TOKEN,
    useClass: UsersService
  }],
})
export class UsersModule {}
