import { CheckLog } from '../../database/check-log.entity';
import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { Location } from '../../database/location.entity';
import { Machine } from '../../database/machine.entity';

export class MachineCheckLog {
  @ApiProperty({
    description: 'checklog',
    type: [CheckLog],
  })
  checkLogs: CheckLog[];

  @ApiProperty({
    description: 'location of this end device',
    type: Location,
  })
  location: Location;
}

export class MachineAndLogWithLocation extends IntersectionType(
  MachineCheckLog,
  Machine,
) {}
