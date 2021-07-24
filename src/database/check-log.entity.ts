import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseOptions } from './base-options.entity';
import { OmitType } from '@nestjs/mapped-types';
import { Machine } from './machine.entity';

@Entity()
export class CheckLog extends BaseOptions {
  @PrimaryGeneratedColumn()
  logId: number;

  @Column({
    type: 'float',
  })
  ss: number;

  @ManyToOne(() => Machine, (machine) => machine.checkLogs)
  @JoinColumn({
    name: 'machineId',
  })
  machine: Machine;
}
