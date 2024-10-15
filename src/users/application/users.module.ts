import { Module} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from '../http/users.controller';
import { RepositoryModule } from '../../db/repository.persistence.module';


@Module({
  imports:[RepositoryModule],
  controllers: [ UsersController],
  providers: [UsersService],
})
export class UsersModule {}
