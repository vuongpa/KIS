import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProjectEntity } from './project.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column({ name: 'password_hash' })
  password_hash!: string;

  @OneToMany(() => ProjectEntity, (project) => project.owner)
  projects!: ProjectEntity[];
}
