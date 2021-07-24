import {
  Column,
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
import { IsNumber, IsString } from 'class-validator';

@Entity()
export class Machine extends BaseOptions {
  @IsNumber()
  @PrimaryGeneratedColumn()
  machineId: number;

  @IsString()
  @Column({
    type: 'varchar',
    nullable: true,
  })
  machineUUID: string;

  @ManyToOne(() => Location, (location) => location.machines, { cascade: true })
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
