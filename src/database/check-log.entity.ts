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
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CheckLog extends BaseOptions {
  @ApiProperty({
    description: 'log 의 primary key 입니다.',
    type: String,
    example: '서울특별시 동대문구 서울시립대로 163',
    nullable: false,
  })
  @IsNumber()
  @PrimaryGeneratedColumn()
  logId: number;

  @ApiProperty({
    description: '측정된 ss value 입니다.',
    type: String,
    example: '서울특별시 동대문구 서울시립대로 163',
    nullable: false,
  })
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
