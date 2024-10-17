import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/application/users.service';
import { User } from '../users/domain/model/user';
import { UpdateCalculatorDto } from './dto/update-water-calculator.dto';
import { CLIMA_SERVICE_TOKEN, GeoclimateService } from '../geoclimate/application/geoclimate.service';
import { WaterIntake } from './water-calculator';

@Injectable()
export class WaterCalculatorService {
  constructor(
    private userService: UsersService,
    @Inject(CLIMA_SERVICE_TOKEN)
    private readonly climateService: GeoclimateService,
  ) { }

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

  async getClima(city: string, state: string): Promise<{ averageTemperature: number; relativeHumidity: number }> {
    const climate = await this.climateService.getClimate(city, state);

    return {
      averageTemperature: climate.averageTemperature,
      relativeHumidity: climate.relativeHumidity
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

  async getWaterIntake(weight: number, city: string, state: string): Promise<WaterIntake> {
    const clima = await this.getClima(city, state)
    const intake = await this.calculateWaterIntake(weight)
    let message = ''
    const climateUnsafe = await this.statusClima(clima.averageTemperature, clima.relativeHumidity)
    if (climateUnsafe == true) {
       message = "Alerta de risco a sáude, recomendo ingerir 4,5L litros de agua hoje, dado as condições climaticas de onde mora."
    }
       message = `Recomenda-se ingerir ${intake}L no dia, condições climáticas dentro da normalidade`
   
    const newAlert = new WaterIntake(weight,city,state,clima.relativeHumidity,clima.averageTemperature,message)

    return newAlert
  }

}

