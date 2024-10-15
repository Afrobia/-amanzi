import { Test, TestingModule } from '@nestjs/testing';
import { GeoclimateService } from '../application/geoclimate.service';

describe('GeoclimateService', () => {
  let service: GeoclimateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeoclimateService],
    }).compile();

    service = module.get<GeoclimateService>(GeoclimateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
