import { Injectable } from '@nestjs/common';
import { CreateWaterIntakeDto } from '../http/dto/create-water-intake.dto';
import { UpdateWaterIntakeDto } from '../http/dto/update-water-intake.dto';

@Injectable()
export class WaterIntakeService {
  create(createWaterIntakeDto: CreateWaterIntakeDto) {
    return 'This action adds a new waterIntake';
  }

  findAll() {
    return `This action returns all waterIntake`;
  }

  findOne(id: number) {
    return `This action returns a #${id} waterIntake`;
  }

  update(id: number, updateWaterIntakeDto: UpdateWaterIntakeDto) {
    return `This action updates a #${id} waterIntake`;
  }

  remove(id: number) {
    return `This action removes a #${id} waterIntake`;
  }
}
