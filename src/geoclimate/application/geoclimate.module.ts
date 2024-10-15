import { Module } from '@nestjs/common';
import { LocationController } from '../http/geoclimate.controller';
import { LocationService } from './location.service';
import { RepositoryModule } from '../../db/repository.persistence.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CLIMA_SERVICE_TOKEN, GeoclimateService } from './geoclimate.service';

@Module({
  imports:[RepositoryModule, ConfigModule, HttpModule],
  controllers: [LocationController],
  providers: [{
    provide: CLIMA_SERVICE_TOKEN,
    useClass: GeoclimateService
  },LocationService],
  exports: [CLIMA_SERVICE_TOKEN]
})
export class GeoclimateModule {}
