import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/application/users.service';
import { User } from '../users/domain/model/user';
import { UpdateCalculatorDto } from './dto/update-water-calculator.dto';
import { LocationService } from '../geoclimate/application/location.service';

@Injectable()
export class WaterCalculatorService {
  constructor(
    private userService: UsersService,
    private locationService: LocationService,
  ) {}
  
  async calculateWater(weight: number) {
    const intake = Number(((35 * weight) / 1000).toFixed(2));
    return intake;
  }

  async modifyWeight(email: string, update: UpdateCalculatorDto): Promise<User> {
    const { weight } = update;
    const waterIntake = await this.calculateWater(weight);
    const updateUser = this.userService.modifyWeight(
      email,
      weight,
      waterIntake,
    );
    return updateUser;
  }

  
  
}
