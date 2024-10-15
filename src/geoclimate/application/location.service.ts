import { Inject, Injectable } from '@nestjs/common';
import { CLIMA_SERVICE_TOKEN, GeoclimateService } from './geoclimate.service';
import { LOCATION_REPO_TOKEN, LocationRepositoryInterface } from './port/location-repository.interface';
import { Location } from '../domain/location';

@Injectable()
export class LocationService {
  constructor(
    @Inject(LOCATION_REPO_TOKEN)
    private readonly locationRepository: LocationRepositoryInterface,
    @Inject(CLIMA_SERVICE_TOKEN)
    private readonly climateService: GeoclimateService,
  ) {}

  async createLocation(city: string, state: string): Promise<Location>{
    const climate = await this.climateService.getClimate(city, state);
    const newlocation = new Location()
    newlocation.city = city
    newlocation.state = state
    newlocation.averageTemperature = climate.averageTemperature
    newlocation.relativeHumidity = climate.relativeHumidity
    this.locationRepository.registerlocation(newlocation);
    return newlocation
  }

  async getClima(city:string,state:string){
    const geoclimate = new Location()
    const climate = await this.climateService.getClimate(city, state);
    geoclimate.city = city
    geoclimate.state = state
    geoclimate.averageTemperature = climate.averageTemperature
    geoclimate.relativeHumidity = climate.relativeHumidity
    
  }

  async listLocationRequest():Promise<Location[]>{
    return this.locationRepository.list()
  }
}