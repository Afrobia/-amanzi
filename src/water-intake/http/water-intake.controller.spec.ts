import { Test, TestingModule } from '@nestjs/testing';
import { WaterIntakeController } from './water-intake.controller';
import { WaterIntakeService } from '../application/water-intake.service';

describe('WaterIntakeController', () => {
  let controller: WaterIntakeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaterIntakeController],
      providers: [WaterIntakeService],
    }).compile();

    controller = module.get<WaterIntakeController>(WaterIntakeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
