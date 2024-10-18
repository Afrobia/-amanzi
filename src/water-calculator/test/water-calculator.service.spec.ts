import { Test, TestingModule } from '@nestjs/testing';
import { WaterCalculatorService } from '../water-calculator.service';
import { CLIMA_SERVICE_TOKEN, GeoclimateService } from '../../geoclimate/application/geoclimate.service';
import { WaterIntake } from '../water-calculator';

describe('WaterCalculatorService', () => {
  let service: WaterCalculatorService;
  let climateService: GeoclimateService;
  const mockGeoclimateService = {
    getClimate: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaterCalculatorService,
      {provide: CLIMA_SERVICE_TOKEN, useValue: mockGeoclimateService}]
    })
    .compile();
    

    service = module.get<WaterCalculatorService>(WaterCalculatorService);
    climateService = module.get<GeoclimateService>(CLIMA_SERVICE_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate water intake', async () => {
    const weight = 70;
    const intake = await service.calculateWaterIntake(weight);
    expect(intake).toBe(2.45);
  });

  it('it gets the water intake based on weight when climate is Safe', async () => {
    jest.spyOn(mockGeoclimateService, 'getClimate').mockResolvedValue({averageTemperature: 25, relativeHumidity: 70});
    const weight = 70;
    const city = 'São Paulo';
    const state = 'SP';
    const intake = 2.45
    const expectedWaterIntake = new WaterIntake(
    weight,
    city,
    state,
    70,
    25,
    `Recomenda-se ingerir ${intake}L no dia, condições climáticas dentro da normalidade`);
    const waterIntake = await service.getWaterIntake(weight, city, state);
    expect(waterIntake).toEqual(expectedWaterIntake);
  });

  it('it gets the 4L water intake when temperature is Unsafe', async () => {
    jest.spyOn(mockGeoclimateService, 'getClimate').mockResolvedValue({averageTemperature: 35, relativeHumidity: 50});
    const weight = 70;
    const city = 'São Paulo';
    const state = 'SP';
    const expectedWaterIntake = new WaterIntake(
    weight,
    city,
    state,
    50,
    35,
    "Alerta de risco a sáude, recomendo ingerir 4,5L litros de agua hoje, dado as condições climaticas de onde mora.");
    const waterIntake = await service.getWaterIntake(weight, city, state);
    expect(waterIntake).toEqual(expectedWaterIntake);
  });

  it('it gets the 4L water intake when humidty is Unsafe', async () => {
    jest.spyOn(mockGeoclimateService, 'getClimate').mockResolvedValue({averageTemperature: 24, relativeHumidity: 10});
    const weight = 70;
    const city = 'São Paulo';
    const state = 'SP';
    const expectedWaterIntake = new WaterIntake(
    weight,
    city,
    state,
    10,
    24,
    "Alerta de risco a sáude, recomendo ingerir 4,5L litros de agua hoje, dado as condições climaticas de onde mora.");
    const waterIntake = await service.getWaterIntake(weight, city, state);
    expect(waterIntake).toEqual(expectedWaterIntake);
  });

  it('it gets the 4L water intake when climate(both) are Unsafe', async () => {
    jest.spyOn(mockGeoclimateService, 'getClimate').mockResolvedValue({averageTemperature: 35, relativeHumidity: 10});
    const weight = 70;
    const city = 'São Paulo';
    const state = 'SP';
    const expectedWaterIntake = new WaterIntake(
    weight,
    city,
    state,
    10,
    35,
    "Alerta de risco a sáude, recomendo ingerir 4,5L litros de agua hoje, dado as condições climaticas de onde mora.");
    const waterIntake = await service.getWaterIntake(weight, city, state);
    expect(waterIntake).toEqual(expectedWaterIntake);
  });
});
