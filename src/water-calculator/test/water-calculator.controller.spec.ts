import { Test, TestingModule } from '@nestjs/testing';
import { WaterCalculatorController } from '../water-calculator.controller';
import { WaterCalculatorService } from '../water-calculator.service';

describe('WaterCalculatorController', () => {
  let controller: WaterCalculatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaterCalculatorController],
      providers: [WaterCalculatorService],
    }).compile();

    controller = module.get<WaterCalculatorController>(WaterCalculatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
