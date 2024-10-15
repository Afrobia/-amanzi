import { Inject, Injectable } from '@nestjs/common';
import { GeoclimateService } from './geoclimate.service';
import { LOCATION_REPO_TOKEN, LocationRepositoryInterface } from './location-repository.interface';
import { Location } from '../domain/location';

@Injectable()
export class LocationService {
  constructor(
    @Inject(LOCATION_REPO_TOKEN)
    private readonly locationRepository: LocationRepositoryInterface,
    private climateService: GeoclimateService,
  ) {}

  async createLocation(city: string, state: string) {
    const climate = await this.climateService.getClimate(city, state);
    const newlocation = new Location()
    newlocation.city = city
    newlocation.state = state
    newlocation.averageTemperature = climate.averageTemperature
    newlocation.relativeHumidity = climate.relativeHumidity
    return this.locationRepository.registerlocation(newlocation);
  }


}