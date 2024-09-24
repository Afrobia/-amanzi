import { PartialType } from '@nestjs/mapped-types';
import { CreateWaterIntakeDto } from './create-water-intake.dto';

export class UpdateWaterIntakeDto extends PartialType(CreateWaterIntakeDto) {}
