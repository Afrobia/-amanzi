import { PartialType } from '@nestjs/swagger';
import { CreateLocationDto } from './create-geoclimate.dto';

export class UpdateGeoclimateDto extends PartialType(CreateLocationDto) {}
