import { Module } from "@nestjs/common";
import { LocationEntity } from "../geoclimate/infra/entities/geoclimate.entity";
import { LOCATION_REPO_TOKEN } from "../geoclimate/application/port/location-repository.interface";
import { LocationMapper } from "../geoclimate/infra/mapper/location.mapper";
import { LocationRepository } from "../geoclimate/infra/repository/location.repository";
import { UserMapper } from "../users/infrastructure/typeOrm/user.mapper";
import { UserEntity } from "../users/infrastructure/typeOrm/user.entity";
import { UserRepository } from "../users/infrastructure/typeOrm/user.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { USER_REPO_TOKEN } from "../users/application/ports/user-repository";



@Module({
  imports: [TypeOrmModule.forFeature([LocationEntity, UserEntity])],
  providers: [{
    provide: USER_REPO_TOKEN,
    useClass: UserRepository 
  },{
    provide: LOCATION_REPO_TOKEN,
    useClass: LocationRepository 
  }, UserMapper, LocationMapper],
  exports: [USER_REPO_TOKEN, LOCATION_REPO_TOKEN],
})

export class RepositoryModule {}