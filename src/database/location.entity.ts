import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseOptions } from './base-options.entity';
import { Machine } from './machine.entity';
import { IsNumber, IsString } from 'class-validator';

// TODO: 지역을 어떻게 unique 하게 구분할 것인가.
@Entity()
export class Location extends BaseOptions {
  @IsNumber()
  @PrimaryGeneratedColumn()
  locationId: number;

  @IsNumber()
  @Column({
    type: 'float',
  })
  latitude: number;

  @IsNumber()
  @Column({
    type: 'float',
  })
  longitude: number;

  @IsString()
  @Column()
  addressDepth1: string;

  @IsString()
  @Column()
  addressDepth2: string;

  @IsString()
  @Column()
  addressDepth3: string;

  @IsString()
  @Column()
  fullAddress: string;

  @IsString()
  @Column({
    comment: '우편번호',
  })
  locationZoneNumber: string;

  @OneToMany(() => Machine, (machine) => machine.location)
  @JoinColumn({
    name: 'machineId',
  })
  machines: Machine[];
}
