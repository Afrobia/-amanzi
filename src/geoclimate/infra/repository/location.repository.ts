import { Injectable } from "@nestjs/common";
import { LocationEntity } from "../entities/geoclimate.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Location } from "../../domain/location";
import { LocationMapper } from "../mapper/location.mapper";


@Injectable()
export class LocationRepository implements LocationRepository {
  private readonly locations = new Map<string, LocationEntity>();

  constructor(
    private readonly locationMapper: LocationMapper,
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
  ) {}

  async registerlocation(locationData: Location): Promise<Location> {
    const persistenceModel = this.locationMapper.toEntity(locationData);
    this.locations.set(persistenceModel.id, persistenceModel);
    const newEntity = this.locations.get(persistenceModel.id);
    this.locationRepository.save(newEntity);

    return this.locationMapper.toModel(newEntity);
  }

 
}
