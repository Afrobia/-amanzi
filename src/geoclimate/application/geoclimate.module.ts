import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CLIMA_SERVICE_TOKEN, GeoclimateService } from './geoclimate.service';

@Module({
  imports:[ConfigModule, HttpModule],
  providers: [{
    provide: CLIMA_SERVICE_TOKEN,
    useClass: GeoclimateService
  }],
  exports: [CLIMA_SERVICE_TOKEN]
})
export class GeoclimateModule {}
