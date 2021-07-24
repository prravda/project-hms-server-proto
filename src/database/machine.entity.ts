import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseOptions } from './base-options.entity';
import { Location } from './location.entity';
import { CheckLog } from './check-log.entity';
import { Memo } from './memo.entity';

@Entity()
export class Machine extends BaseOptions {
  @PrimaryGeneratedColumn()
  machineId: number;

  @ManyToOne(() => Location, (location) => location.machines)
  @JoinColumn({
    name: 'locationId',
  })
  location: Location;

  @OneToMany(() => CheckLog, (checklog) => checklog.machine)
  @JoinColumn({
    name: 'checkLogId',
  })
  checkLogs: CheckLog[];

  @OneToMany(() => Memo, (memo) => memo.machine)
  @JoinColumn({
    name: 'memoId',
  })
  memos: Memo[];
}
