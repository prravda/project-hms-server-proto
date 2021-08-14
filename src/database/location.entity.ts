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
import { ApiProperty } from '@nestjs/swagger';

// TODO: 지역을 어떻게 unique 하게 구분할 것인가.
@Entity()
export class Location extends BaseOptions {
  @ApiProperty({
    description: 'location 의 primary key 입니다.',
    type: Number,
    example: 1,
    nullable: false,
  })
  @IsNumber()
  @PrimaryGeneratedColumn()
  locationId: number;

  @ApiProperty({
    description: 'location 의 경도값 입니다.',
    type: Number,
    example: 123.123123123123,
    nullable: false,
  })
  @IsNumber()
  @Column({
    type: 'float',
  })
  latitude: number;

  @ApiProperty({
    description: 'location 의 위도값 입니다.',
    type: Number,
    example: 123.123123123123,
    nullable: false,
  })
  @IsNumber()
  @Column({
    type: 'float',
  })
  longitude: number;

  @ApiProperty({
    description:
      '위/경도를 통해 조회한 도로명 주소의 depth 1 값입니다. \n' +
      '\n 도/광역시/특별시 단위 값이 담깁니다.',
    type: String,
    example: '서울특별시',
    nullable: false,
  })
  @IsString()
  @Column()
  addressDepth1: string;

  @ApiProperty({
    description:
      '위/경도를 통해 조회한 도로명 주소의 depth 2 값입니다. \n' +
      '\n 구/시 단위 값이 담깁니다.',
    type: String,
    example: '동대문구',
    nullable: false,
  })
  @IsString()
  @Column()
  addressDepth2: string;

  @ApiProperty({
    description:
      '위/경도를 통해 조회한 도로명 주소의 depth 2 값입니다. \n' +
      '\n 동/면 단위 값이 담깁니다.',
    type: String,
    example: '전농동',
    nullable: false,
  })
  @IsString()
  @Column()
  addressDepth3: string;

  @ApiProperty({
    description: '위/경도를 통해 조회한 도로명 주소입니다.',
    type: String,
    example: '서울특별시 동대문구 서울시립대로 163',
    nullable: false,
  })
  @IsString()
  @Column()
  fullAddress: string;

  @ApiProperty({
    description: '해당 위치의 우편번호 값입니다.',
    type: String,
    example: '123123',
    nullable: false,
  })
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
