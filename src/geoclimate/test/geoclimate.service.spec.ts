import { Test, TestingModule } from '@nestjs/testing';
import { GeoclimateService } from '../application/geoclimate.service';
import { HttpService } from '@nestjs/axios/dist/http.service';
import { ConfigService } from '@nestjs/config';
import AxiosResponse from 'axios';
import { get } from 'http';

describe('GeoclimateService', () => {
  let service: GeoclimateService;
  let httpService: HttpService;
  let configService: ConfigService;
  const mockHttpService = {
    subscribe: jest.fn(),
    get: jest.fn()
  };
  const mockConfigService = {
    getOrThrow: jest.fn()
  };  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeoclimateService,
      {provide: HttpService, useValue:mockHttpService},
      {provide: ConfigService, useValue:mockConfigService}
      ]
    }).compile();

    service = module.get<GeoclimateService>(GeoclimateService);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /*it('should get climate data', async () => {
    const city = 'São Paulo';
    const state = 'SP';
    const completeResponse = {data: {main: {temp: 25, humidity: 70}}};

    jest.spyOn(mockHttpService, 'get').mockResolvedValue(completeResponse);
    const response = await service.getClimate(city, state);
    expect(response).toEqual({averageTemperature: 25, relativeHumidity: 70});

    expect(mockHttpService).toHaveBeenCalledTimes(1);
    expect(service.getClimate).toHaveBeenCalledWith(city, state);
  });*/
});
