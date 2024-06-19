import { Optional } from '@nestjs/common';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  comment_id:number;
  @Column()
  bbs_id:number;
  @Column()
  uid:number;
  @Column()
  @Optional()
  content:string;
  @Column()
  @Optional()
  use_yn:string;
}