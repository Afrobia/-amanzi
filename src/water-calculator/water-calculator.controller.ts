import { Controller, Body, Patch, Param, Get, Post} from '@nestjs/common';
import { WaterCalculatorService } from './water-calculator.service';
import { UsersService } from '../users/application/users.service';
import { AnonIntakeDto } from './dto/anon-intake-dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { WaterIntake } from './water-calculator';


@Controller('water-calculator')
@ApiTags('Water calculator')
export class WaterCalculatorController {
  constructor(
    private readonly waterCalculatorService: WaterCalculatorService,
    private readonly usersService: UsersService
  ) {};

  @Get(':weight')
  @ApiOperation({summary: "Requisição quanta agua tomar de um usuário, sem parte climatica,"})
  async getIntake(@Param('weight') weight: number){
    const message = `Você deve ingerir ${this.waterCalculatorService.calculateWaterIntake(weight)} litros de água por dia.`
    return message
  }

  @Post('intakeAnon')
  @ApiOperation({summary: "Requisição quanta agua tomar anonima"})
  async getAnonIntake(@Body() anonIntakeDto: AnonIntakeDto): Promise<WaterIntake>{
    return this.waterCalculatorService.getWaterIntake(
      anonIntakeDto.weight,
      anonIntakeDto.city,
      anonIntakeDto.state
    )
  }

  @Get(':email')
  @ApiOperation({summary: "Requisição quanta agua tomar email um novo usuário"})
  async getIntakeEmail(@Param('email') email: string): Promise<Object> {
    const user = await this.usersService.findUserByEmail(email)
    return await this.waterCalculatorService.getWaterIntake(
      user.getWeight(),
      user.getCity(),
      user.getState()
    )
  }

};
