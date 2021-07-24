import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseOptions } from './base-options.entity';
import { Machine } from './machine.entity';

@Entity()
export class CheckLog extends BaseOptions {
  @PrimaryGeneratedColumn()
  logId: number;

  @Column({
    type: 'float',
  })
  ss: number;

  @ManyToOne(() => Machine, (machine) => machine.checkLogs, { cascade: true })
  @JoinColumn({
    name: 'machineId',
  })
  machine: Machine;
}
