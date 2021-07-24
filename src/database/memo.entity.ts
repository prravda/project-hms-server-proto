import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseOptions } from './base-options.entity';
import { Machine } from './machine.entity';
import { IsNumber, IsString } from 'class-validator';

@Entity()
export class Memo extends BaseOptions {
  @IsNumber()
  @PrimaryGeneratedColumn()
  memoId: number;

  @IsString()
  @Column({
    type: 'varchar',
  })
  textContents: string;

  @ManyToOne(() => Machine, (machine) => machine.memos, { cascade: true })
  machine: Machine;
}
