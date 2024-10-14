import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { USER_REPO_TOKEN } from '../../application/ports/user-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity} from './user.entity';
import { UserMapper } from './user.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [{
    provide: USER_REPO_TOKEN,
    useClass: UserRepository 
  }, UserMapper],
  exports: [USER_REPO_TOKEN],
})
export class UsersRepositoryModule {}