import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WaterIntakeService } from '../application/water-intake.service';
import { CreateWaterIntakeDto } from './dto/create-water-intake.dto';
import { UpdateWaterIntakeDto } from './dto/update-water-intake.dto';

@Controller('water-intake')
export class WaterIntakeController {
  constructor(private readonly waterIntakeService: WaterIntakeService) {}

  @Post()
  create(@Body() createWaterIntakeDto: CreateWaterIntakeDto) {
    return this.waterIntakeService.create(createWaterIntakeDto);
  }

  @Get()
  findAll() {
    return this.waterIntakeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.waterIntakeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWaterIntakeDto: UpdateWaterIntakeDto,
  ) {
    return this.waterIntakeService.update(+id, updateWaterIntakeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.waterIntakeService.remove(+id);
  }
}
