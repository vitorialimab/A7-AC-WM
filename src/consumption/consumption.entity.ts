// src/consumption/consumption.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Consumption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column('float')
  consumptionAmount: number;

  @CreateDateColumn()
  readingDate: Date;
}
