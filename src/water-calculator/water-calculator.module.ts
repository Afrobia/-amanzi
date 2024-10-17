import { Module } from '@nestjs/common';
import { WaterCalculatorService } from './water-calculator.service';
import { WaterCalculatorController } from './water-calculator.controller';
import { UsersService } from '../users/application/users.service';
import { RepositoryModule } from '../db/repository.persistence.module';
import { CLIMA_SERVICE_TOKEN, GeoclimateService } from '../geoclimate/application/geoclimate.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[RepositoryModule, ConfigModule, HttpModule],
  controllers: [WaterCalculatorController],
  providers: [WaterCalculatorService, {
    provide: CLIMA_SERVICE_TOKEN,
    useClass: GeoclimateService
    },UsersService],
})
export class WaterCalculatorModule {}
