import { Module} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepositoryModule } from '../infrastructure/typeOrm/user-repository.persistence.module';
import { UsersController } from '../http/users.controller';


@Module({
  imports:[UsersRepositoryModule],
  controllers: [ UsersController],
  providers: [UsersService],
})
export class UsersModule {}
