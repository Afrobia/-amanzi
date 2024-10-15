import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { catchError, map } from 'rxjs';

@Injectable()
export class GeoclimateService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getClimate(city: string, state: string) {
    const apiKey = this.configService.get('OPENWEATHERMAP_API_KEY');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},br&appid=${apiKey}&units=metric`;

    return this.httpService.get(url)
      .pipe(
        map((response: AxiosResponse) => {
          const { temp, humidity } = response.data.main;
          return { averageTemperature: temp, relativeHumidity: humidity };
        }),
        catchError(() => {
          throw new HttpException('Erro ao obter dados do clima', HttpStatus.BAD_REQUEST);
        }),
      )
      .toPromise();
  }

}
