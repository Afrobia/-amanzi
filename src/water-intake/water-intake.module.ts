import { Module } from '@nestjs/common';
import { WaterIntakeService } from './application/water-intake.service';
import { WaterIntakeController } from './http/water-intake.controller';

@Module({
  controllers: [WaterIntakeController],
  providers: [WaterIntakeService],
})
export class WaterIntakeModule {}
