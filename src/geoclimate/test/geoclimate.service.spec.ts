import { Test, TestingModule } from '@nestjs/testing';
import { GeoclimateService } from '../application/geoclimate.service';
import { HttpService } from '@nestjs/axios/dist/http.service';
import { ConfigService } from '@nestjs/config';

describe('GeoclimateService', () => {
  let service: GeoclimateService;
  let httpService: HttpService;
  let configService: ConfigService;
  const mockHttpService = {};
  const mockConfigService = {};

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
});
