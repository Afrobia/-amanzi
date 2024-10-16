import { Controller, Body, Patch, Param} from '@nestjs/common';
import { WaterCalculatorService } from './water-calculator.service';
import { UpdateCalculatorDto } from './dto/update-water-calculator.dto';
import { ApiTags } from '@nestjs/swagger';


@Controller('water-calculator')
@ApiTags('Water calculator')
export class WaterCalculatorController {
  constructor(private readonly waterCalculatorService: WaterCalculatorService) {};

  @Patch(':email')
  updateWeight(@Param('email') email: string, @Body() updateWaterCalculatorDto: UpdateCalculatorDto) {
    return this.waterCalculatorService.modifyWeight(email, updateWaterCalculatorDto);
  };

};
