import { Controller, Body, Patch, Param, Get} from '@nestjs/common';
import { WaterCalculatorService } from './water-calculator.service';
import { UsersService } from '../users/application/users.service';
import { UpdateCalculatorDto } from './dto/update-water-calculator.dto';
import { AnonIntakeDto } from './dto/anon-intake-dto';
import { ApiTags } from '@nestjs/swagger';


@Controller('water-calculator')
@ApiTags('Water calculator')
export class WaterCalculatorController {
  constructor(
    private readonly waterCalculatorService: WaterCalculatorService,
    private readonly usersService: UsersService
  ) {};

  @Patch(':email')
  updateWeight(@Param('email') email: string, @Body() updateWaterCalculatorDto: UpdateCalculatorDto) {
    return this.waterCalculatorService.modifyWeight(email, updateWaterCalculatorDto);
  };

  @Get('intakeAnon')
  async getAnonIntake(@Body() anonIntakeDto: AnonIntakeDto): Promise<string>{
    return this.waterCalculatorService.getWaterIntake(
      anonIntakeDto.weight,
      anonIntakeDto.city,
      anonIntakeDto.state
    )
  }

  @Get(':email')
  async getIntakeEmail(@Param('email') email: string): Promise<string> {
    const user = await this.usersService.findUserByEmail(email)
    return this.waterCalculatorService.getWaterIntake(
      user.weight,
      user.city,
      user.state
    )
  }

};
