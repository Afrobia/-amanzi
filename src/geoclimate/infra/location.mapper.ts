import { Injectable } from "@nestjs/common";
import { LocationEntity } from "./entities/geoclimate.entity";
import { Location } from "../domain/location";


@Injectable()
export class LocationMapper {
  toModel(entity: LocationEntity): Location {
    const model = new Location();
    model.id = entity.id
    model.city = entity.city
    model.state = entity.state
    model.averageTemperature = entity.averageTemperature
    model.relativeHumidity = entity.relativeHumidity

    return model;
  }

  toEntity(model: Location): LocationEntity {
    const entity = new LocationEntity();
    entity.id = model.id;
    entity.city = model.city;
    entity.state = model.state;
    entity.averageTemperature = model.averageTemperature;
    entity.relativeHumidity = model.relativeHumidity;

    return entity;
  }
}
