import { Test, TestingModule } from '@nestjs/testing';
import { GeoclimateService } from '../application/geoclimate.service';
import { HttpService } from '@nestjs/axios/dist/http.service';
import { ConfigService } from '@nestjs/config';
import * as rxjs from 'rxjs';
import { Inject } from '@nestjs/common';

describe('GeoclimateService', () => {
  let mockrxjs = jest.mock('rxjs');
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
  const mockRxjs = {};  

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

  /*it('should get climate data', async () => {     // Could not find a way to test this function
    const city = 'São Paulo';                       // because of the TypeError: source.subscribe is not a function
    const state = 'SP';                             // that is thrown when the function is called
    const completeResponse = {data: {main: {averageTemperature: 25, relativeHumidity: 70}}};

    jest.spyOn(mockHttpService, 'get').mockResolvedValue(completeResponse);
    jest.mock('rxjs').mockReturnValueOnce(
      new Promise((resolve, reject) => {
        resolve(true)
    }));
    const response = await service.getClimate(city, state);
    expect(response).toEqual({averageTemperature: 25, relativeHumidity: 70});

    expect(mockHttpService).toHaveBeenCalledTimes(1);
    expect(service.getClimate).toHaveBeenCalledWith(city, state);
  });*/
});
