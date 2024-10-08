import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { TypeOrmUserRepository } from "./repositories/user.repository";
import { dataSourceOptions } from "./typeOrm.config";
import { UsersRepository } from "../../../user/application/user.repository";
import { UserMapper } from "./mappers/user.mapper";


@Module({
    imports: [
      TypeOrmModule.forRoot(dataSourceOptions),
      TypeOrmModule.forFeature([UserEntity])
    ],
    providers: [
      {
        provide: UsersRepository,
        useClass: TypeOrmUserRepository,
      },
      UserMapper,
    ],
    exports: [UsersRepository, TypeOrmModule],
  })
  export class TypeOrmUserPersistenceModule {}