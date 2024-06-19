import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column()
  id: string;

  @Column()
  password: string;
}