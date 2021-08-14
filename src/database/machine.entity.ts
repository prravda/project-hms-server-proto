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
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Machine extends BaseOptions {
  @ApiProperty({
    description:
      'machine 의 id 입니다. 일련번호와는 관련 없는 primary key 입니다.',
    type: Number,
    example: 1,
    nullable: false,
  })
  @IsNumber()
  @PrimaryGeneratedColumn()
  machineId: number;

  @ApiProperty({
    description:
      'machine 의 uuid 입니다. database 에 저장되며 생기는 primary key 와 달리, 사용자가 직접 기입하는 항목입니다.',
    type: String,
    example: 'aadsf11-132',
    nullable: false,
  })
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
