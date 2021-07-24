import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseOptions } from './base-options.entity';
import { Machine } from './machine.entity';

@Entity()
export class Memo extends BaseOptions {
  @PrimaryGeneratedColumn()
  memoId: number;

  @Column({
    type: 'varchar',
  })
  textContents: number;

  @ManyToOne(() => Machine, (machine) => machine.memos, { cascade: true })
  machine: Machine;
}
