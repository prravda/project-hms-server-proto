import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseOptions } from './base-options.entity';
import { Machine } from './machine.entity';
import { IsNumber } from 'class-validator';

@Entity()
export class CheckLog extends BaseOptions {
  @IsNumber()
  @PrimaryGeneratedColumn()
  logId: number;

  @IsNumber()
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
