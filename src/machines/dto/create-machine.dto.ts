import { ParseToHumanReadableLocationDto } from '../../locations/dto/parse-to-human-readable-location.dto';
import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { Machine } from '../../database/machine.entity';

export class CreateMachineDto extends IntersectionType(
  PickType(Machine, ['machineUUID'] as const),
  ParseToHumanReadableLocationDto,
) {}
