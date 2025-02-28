import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'action-logs' })
export class ActionLogEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  action!: string;

  @CreateDateColumn()
  timestamp!: Date;
}
