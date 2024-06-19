import { Optional } from '@nestjs/common';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Bbs {
  @PrimaryGeneratedColumn()
  bbs_id: number;
  @Column()
  uid: number;
  @Column()
  @Optional()
  title: string;
  @Column()
  @Optional()
  content: string;
  @Column()
  @Optional()
  use_yn: string;
}