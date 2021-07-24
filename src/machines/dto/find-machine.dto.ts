import { PickType } from '@nestjs/mapped-types';
import { CreateMachineDto } from './create-machine.dto';

export class FindMachineDto extends PickType(CreateMachineDto, [
  'machineUUID',
] as const) {}
