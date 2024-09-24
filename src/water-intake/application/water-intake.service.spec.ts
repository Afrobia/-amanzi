import { Test, TestingModule } from '@nestjs/testing';
import { WaterIntakeService } from './application/water-intake.service';

describe('WaterIntakeService', () => {
  let service: WaterIntakeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaterIntakeService],
    }).compile();

    service = module.get<WaterIntakeService>(WaterIntakeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
