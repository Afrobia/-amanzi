import { Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, map, Observable } from 'rxjs';
import { GeoclimateData } from './geoclimate.interface';
import * as Rxjs from 'rxjs';



export class GeoclimateService {
  constructor(
    @Inject(HttpService)
    private httpService: HttpService,
    @Inject(ConfigService)
    private configService: ConfigService,
  ) {}

  
  async getClimate(city: string, state: string): Promise<{ averageTemperature: number; relativeHumidity: number }> {
    const apiKey = this.configService.getOrThrow<string>('OPENWEATHERMAP_API_KEY');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},BR&appid=${apiKey}&units=metric`;

      const response = await this.getData(url);
      return {
        averageTemperature: response.averageTemperature,
        relativeHumidity: response.relativeHumidity
      }
  }
  async getData(url: string){
    const {status, data} = await Rxjs.firstValueFrom(this.httpService.get<GeoclimateData>(url));
    if (status !== 200) {
      throw new Error('Erro ao buscar dados climáticos');
    } else {
      return data;
    }
  }
}

export const CLIMA_SERVICE_TOKEN = Symbol();