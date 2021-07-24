import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseOptions } from './base-options.entity';
import { Machine } from './machine.entity';

// TODO: 지역을 어떻게 unique 하게 구분할 것인가.
@Entity()
export class Location extends BaseOptions {
  @PrimaryGeneratedColumn()
  locationId: number;

  @Column({
    type: 'float',
  })
  latitude: number;

  @Column({
    type: 'float',
  })
  longitude: number;

  @Column()
  addressDepth1: string;

  @Column()
  addressDepth2: string;

  @Column()
  addressDepth3: string;

  @Column()
  fullAddress: string;

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
