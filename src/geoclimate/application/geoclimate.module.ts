import { Module } from '@nestjs/common';
import { GeoclimateService } from './geoclimate.service';
import { LocationController } from '../http/geoclimate.controller';
import { LocationService } from './location.service';
import { RepositoryModule } from '../../db/repository.persistence.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[RepositoryModule, ConfigModule, HttpModule],
  controllers: [LocationController],
  providers: [LocationService],
})
export class GeoclimateModule {}
