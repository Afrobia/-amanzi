import { Inject, Injectable } from '@nestjs/common';
import { CLIMA_SERVICE_TOKEN, GeoclimateService } from '../geoclimate/application/geoclimate.service';
import { WaterIntake } from './water-calculator';
import { log } from 'console';

@Injectable()
export class WaterCalculatorService {
  constructor(
    @Inject(CLIMA_SERVICE_TOKEN)
    private readonly climateService: GeoclimateService
  ) { }

  async calculateWaterIntake(weight: number) {
    const intake = Number(((35 * weight) / 1000).toFixed(2));
    return intake;
  }

  async getClima(city: string, state: string): Promise<{ averageTemperature: number; relativeHumidity: number }> {
    try {
      const climate = await this.climateService.getClimate(city, state);
      return {
        averageTemperature: climate.averageTemperature,
        relativeHumidity: climate.relativeHumidity
      }
    } catch (error) {
      console.log(error)
    };
  }

  statusTemperature(temperature: number): StatusCodes {
    if (temperature >= 18 && temperature <= 29.9) {
      return StatusCodes.Safe;
    } else if (temperature >= 30) {
      return StatusCodes.Unsafe;
    }
  }

  statusHumidity(humidity: number): StatusCodes {
    if (humidity >= 40 && humidity <= 70) {
      return StatusCodes.Safe;
    } else if (humidity <= 39.9) {
      return StatusCodes.Unsafe;
    }
  }

  async isClimateUnsafe(temperature: number, humidity: number): Promise<boolean> {
    const sHumidity = this.statusHumidity(humidity);
    const sTempeture = this.statusTemperature(temperature);
    if (sHumidity == StatusCodes.Unsafe || sTempeture == StatusCodes.Unsafe) {
      return true;
    } else return false;
  }

  async getWaterIntake(weight: number, city: string, state: string): Promise<WaterIntake> {
    const clima = await this.getClima(city, state)
    const intake = await this.calculateWaterIntake(weight)
    let message = ''
    const climateUnsafe = await this.isClimateUnsafe(clima.averageTemperature, clima.relativeHumidity)
    if (climateUnsafe == true) {
      message = "Alerta de risco a sáude, recomendo ingerir 4,5L litros de agua hoje, dado as condições climaticas de onde mora."
    } else
      message = `Recomenda-se ingerir ${intake}L no dia, condições climáticas dentro da normalidade`

    const newAlert = new WaterIntake(weight, city, state, clima.relativeHumidity, clima.averageTemperature, message)

    return newAlert
  }
}

enum StatusCodes {
  Safe,
  Unsafe
};
