import { Module } from "@nestjs/common";
import { UserMapper } from "../users/infrastructure/typeOrm/user.mapper";
import { UserEntity } from "../users/infrastructure/typeOrm/user.entity";
import { UserRepository } from "../users/infrastructure/typeOrm/user.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { USER_REPO_TOKEN } from "../users/application/ports/user-repository";



@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [{
    provide: USER_REPO_TOKEN,
    useClass: UserRepository 
  }, UserMapper],
  exports: [USER_REPO_TOKEN],
})

export class RepositoryModule {}