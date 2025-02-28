import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'layouts' })
export class LayoutEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'json', nullable: false })
  layout!: object;

  @Column({ name: 'userId' })
  userId!: number;
}