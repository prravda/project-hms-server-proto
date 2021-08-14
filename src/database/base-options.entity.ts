import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class BaseOptions {
  @ApiProperty({
    description: '생성일입니다.',
    type: String,
    example: '2021-07-24T10:58:48.753Z',
    nullable: false,
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: '갱신일입니다.',
    type: String,
    example: '2021-07-24T10:58:48.753Z',
    nullable: false,
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: '삭제일입니다.',
    type: String,
    example: '2021-07-24T10:58:48.753Z',
    nullable: false,
  })
  @DeleteDateColumn()
  deletedAt: Date;
}
