import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProjectEntity } from './project.entity';

@Entity({ name: 'pages' })
export class PageEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  urlAlias!: string;

  @Column()
  title!: string;

  @Column('text')
  metaTags!: string;

  @Column('json')
  sections!: object;

  @ManyToOne(() => ProjectEntity, (project) => project.pages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project!: ProjectEntity;
}