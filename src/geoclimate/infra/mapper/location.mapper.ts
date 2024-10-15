import { Injectable } from "@nestjs/common";
import { LocationEntity } from "../entities/geoclimate.entity";
import { Location } from "../../../geoclimate/domain/location";



@Injectable()
export class LocationMapper {
  toModel(entity: LocationEntity): Location {
    const model = new Location();
    model.id = entity.id
    model.city = entity.city
    model.state = entity.state
    return model;
  }

  toEntity(model: Location): LocationEntity {
    const entity = new LocationEntity();
    entity.id = model.id;
    entity.city = model.city;
    entity.state = model.state;
    return entity;
  }
}
