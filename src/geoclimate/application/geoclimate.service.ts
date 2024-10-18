import { Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, map, Observable } from 'rxjs';
import { GeoclimateData } from './geoclimate.interface';
import * as Rxjs from 'rxjs';
import { AxiosResponse } from 'axios';



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

    try {
      const response: AxiosResponse = await firstValueFrom(this.httpService.get(url));
      const data = response.data;
      return {
        averageTemperature: data.main.temp,
        relativeHumidity: data.main.humidity,
      };
    } catch (error) {
      console.error('Erro ao buscar dados climáticos:', error);
      return null;
    }
  }
}

export const CLIMA_SERVICE_TOKEN = Symbol();