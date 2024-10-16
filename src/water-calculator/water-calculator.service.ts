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
  
  async calculateWaterIntake(weight: number) {
    const intake = Number(((35 * weight) / 1000).toFixed(2));
    return intake;
  }

  async modifyWeight(email: string, update: UpdateCalculatorDto): Promise<User> {
    const { weight } = update;
    const waterIntake = await this.calculateWaterIntake(weight);
    const updateUser = this.userService.modifyWeight(
      email,
      weight,
      waterIntake,
    );
    return updateUser;
  }
  
  async getClima(city:string,state:string): Promise<{ averageTemperature: number; relativeHumidity: number }> {
    const climate = await this.climateService.getClimate(city, state);
       
    return {
      averageTemperature:climate.averageTemperature,
      relativeHumidity:climate.relativeHumidity
    }
  }

  statusTemperature(temperature: number): StatusCodes {
    if (temperature >= 18 || temperature <= 29.9) {
      return StatusCodes.Safe;
    } else if (temperature >= 30) {
      return StatusCodes.Unsafe;
    }
  }

  statusHumidity(humidity: number): StatusCodes {
    if (humidity >= 40 || humidity <= 70) {
      return StatusCodes.Safe;
    } else if (humidity <= 39.9) {
      return StatusCodes.Unsafe;
    }
  }

  isClimateUnsafe(temperature: number, humidity: number): boolean {
    const sHumidity = this.statusHumidity(humidity);
    const sTempeture = this.statusTemperature(temperature);
    if (sHumidity == StatusCodes.Unsafe || sTempeture == StatusCodes.Unsafe) {
      return true;
    } else return false;
  }
  
  async getWaterIntake(weight: number, city: string, state: string): Promise<string> {
    const clima = await this.getClima(city, state)

    if (this.isClimateUnsafe(
      clima.averageTemperature,
      clima.relativeHumidity
    ) == true) {
      return "Você deve tomar pelo menos 4 litros de agua hoje, dado as condições climaticas de onde mora."
    } else {
      const intake = this.calculateWaterIntake(weight)
      return "Você deve tomar pelo menos " + intake + " litros."
    }
  }
}

enum StatusCodes {
    Safe,
    Unsafe
};
