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

  async getClima(city:string,state:string):Promise<Location> {
    const geoclimate = new Location()
    const climate = await this.climateService.getClimate(city, state);
    geoclimate.city = city
    geoclimate.state = state
    geoclimate.averageTemperature = climate.averageTemperature
    geoclimate.relativeHumidity = climate.relativeHumidity
    
    return geoclimate
  }

  async listLocationRequest():Promise<Location[]>{
    return this.locationRepository.list()
  }

  statusTemperature(temperature: number): boolean {
    if (temperature >= 18 || temperature <= 29.9) {
      return false;
    } else if (temperature >= 30) {
      return true;
    }
  }

  statusHumidity(humidity: number): boolean {
    if (humidity >= 40 || humidity <= 70) {
      return false;
    } else if (humidity <= 39.9) {
      return true;
    }
  }

  statusClima(temperature: number, humidity: number): boolean {
    const sHumidity = this.statusHumidity(humidity);
    const sTempeture = this.statusTemperature(temperature);
    if (sHumidity == true && sTempeture == true) {
      return true;
    } else if (sHumidity == true && sTempeture == false) {
      return true;
    } else if (sHumidity == false && sTempeture == true) {
      return true;
    }
    return false;
  }
}