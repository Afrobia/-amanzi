import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/application/users.service';
import { User } from '../users/domain/model/user';
import { UpdateCalculatorDto } from './dto/update-water-calculator.dto';
import { CLIMA_SERVICE_TOKEN, GeoclimateService } from '../geoclimate/application/geoclimate.service';

@Injectable()
export class WaterCalculatorService {
  constructor(
    private userService: UsersService,
    @Inject(CLIMA_SERVICE_TOKEN)
    private readonly climateService: GeoclimateService,
  ) {}
  
  async calculateWater(weight: number) {
    const intake = Number(((35 * weight) / 1000).toFixed(2));
    return intake;
  }

  async modifyWeight(email: string, update: UpdateCalculatorDto): Promise<User> {
    const { weight } = update;
    const waterIntake = await this.calculateWater(weight);
    const updateUser = this.userService.modifyWeight(
      email,
      weight,
      waterIntake,
    );
    return updateUser;
  }
  
  async getClima(city:string,state:string) {
    const climate = await this.climateService.getClimate(city, state);
       
    return {
      averageTemperaturae:climate.averageTemperature,
      relativeHumidity:climate.relativeHumidity
    }
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
