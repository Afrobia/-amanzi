import { Test, TestingModule } from '@nestjs/testing';
import { WaterCalculatorController } from '../water-calculator.controller';
import { WaterCalculatorService } from '../water-calculator.service';
import { UsersService } from '../../users/application/users.service';
import { AnonIntakeDto } from '../dto/anon-intake-dto';
import { WaterIntake } from '../water-calculator';

describe('WaterCalculatorController', () => {
  let controller: WaterCalculatorController;
  const mockWaterCalculatorService = {
    getWaterIntake: jest.fn(),
    calculateWaterIntake: jest.fn() 
  };
  const mockUsersService = {
    findUserByEmail: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaterCalculatorController],
      providers: [{provide: WaterCalculatorService, useValue: mockWaterCalculatorService},
        {provide: UsersService, useValue: mockUsersService}]
    }).compile();

    controller = module.get<WaterCalculatorController>(WaterCalculatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('when /POST intakeAnon is called', () => {
    it('it returns the water intake calculated by the service as a WaterIntake object', async () => {
      const anonWeight = 80;
      const anonCity = 'Goânia';
      const anonState = 'GO';
      
      const dto = {'weight':anonWeight,'city': anonCity,'state': anonState} as AnonIntakeDto;
      jest.spyOn(mockWaterCalculatorService, 'getWaterIntake').mockResolvedValue(new WaterIntake(
        anonWeight,
        anonCity,
        anonState,
        70,
        25,
        `Recomenda-se ingerir 2.80L no dia, condições climáticas dentro da normalidade`
      ))
      const waterIntake = await controller.getAnonIntake(dto);
      
      expect(waterIntake).toEqual(new WaterIntake(
        anonWeight,
        anonCity,
        anonState,
        70,
        25,
        `Recomenda-se ingerir 2.80L no dia, condições climáticas dentro da normalidade`
      ));

      expect(mockWaterCalculatorService.getWaterIntake).toHaveBeenCalledWith(dto.weight, dto.city, dto.state);
    });
  });

  describe('when /GET getIntakeEmail is called', () => {
    it('it returns the water intake calculated by the service as a WaterIntake object after getting the user by email', async () => {
      const userWeight = 80;
      const userCity = 'Goânia';
      const userState = 'GO';
      const userEmail = 'user@mail.com';
      jest.spyOn(mockUsersService, 'findUserByEmail').mockResolvedValue({
        getWeight: () => userWeight,
        getCity: () => userCity,
        getState: () => userState
      });
      
      
      const userData = {userWeight, userCity, userState};
      jest.spyOn(mockWaterCalculatorService, 'getWaterIntake').mockResolvedValue(new WaterIntake(
        userWeight,
        userCity,
        userState,
        80,
        21,
        `Recomenda-se ingerir 2.80L no dia, condições climáticas dentro da normalidade`
      ))
      const waterIntake = await controller.getIntakeEmail(userEmail);

      expect(mockUsersService.findUserByEmail).toHaveBeenCalledWith(userEmail);
      
      expect(waterIntake).toEqual(new WaterIntake(
        userWeight,
        userCity,
        userState,
        80,
        21,
        `Recomenda-se ingerir 2.80L no dia, condições climáticas dentro da normalidade`
      ));

      expect(mockWaterCalculatorService.getWaterIntake).toHaveBeenCalledWith(userData.userWeight, userData.userCity, userData.userState);
    });
  });

  it('should return the water intake calculated by the service with just weight', async () => {
    const weight = 80;
    const message = `Você deve ingerir ${2.80} litros de água por dia.`;
    jest.spyOn(mockWaterCalculatorService, 'calculateWaterIntake').mockReturnValue(2.80);
    const response = await controller.getIntake(weight);

    expect(response).toEqual(message);
    expect(mockWaterCalculatorService.calculateWaterIntake).toHaveBeenCalledWith
  });
});
