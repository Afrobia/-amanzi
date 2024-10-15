import { Test, TestingModule } from '@nestjs/testing';
import { GeoclimateService } from '../application/geoclimate.service';
import { LocationController } from '../http/geoclimate.controller';

describe('LocationController', () => {
  let controller: LocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [GeoclimateService],
    }).compile();

    controller = module.get<LocationController>(LocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
