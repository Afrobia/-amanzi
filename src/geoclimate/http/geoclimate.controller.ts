import { Controller, Post, Body } from '@nestjs/common';
import { LocationService } from '../application/location.service';
import { CreateLocationDto } from './dto/create-geoclimate.dto';

@Controller('localizacoes')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async create(@Body() createLocalizacaoDto: CreateLocationDto) {
    return this.locationService.createLocation(createLocalizacaoDto.city, createLocalizacaoDto.state);
  }
}
