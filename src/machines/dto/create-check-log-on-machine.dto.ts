import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { CreateMachineDto } from './create-machine.dto';
import { CheckLog } from '../../database/check-log.entity';

export class CreateCheckLogOnMachineDto extends IntersectionType(
  CreateMachineDto,
  PickType(CheckLog, ['ss'] as const),
) {}
