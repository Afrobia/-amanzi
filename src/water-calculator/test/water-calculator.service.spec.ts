import { Test, TestingModule } from '@nestjs/testing';
import { WaterCalculatorService } from '../water-calculator.service';

describe('WaterCalculatorService', () => {
  let service: WaterCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaterCalculatorService],
    }).compile();

    service = module.get<WaterCalculatorService>(WaterCalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
