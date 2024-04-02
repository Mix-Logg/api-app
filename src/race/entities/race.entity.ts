import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Race {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idClient: number;

  @Column()
  idDriver: number;

  @Column()
  km: number;

  @Column({ length: 150 })
  initial: string;

  @Column({ length: 150 })
  finish: string;

  @Column({ length: 100 })
  value: string;

  @Column({ length: 50 })
  create_at: string;

  @Column({ length: 50 })
  delete_at: string;
  
  @Column({ length: 50, default: '1' })
  isVisible: string;
}
