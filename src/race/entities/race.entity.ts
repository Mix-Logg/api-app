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

  @Column({ length: 50 })
  idClientIo: string;

  @Column()
  idDriver: number;

  @Column()
  km: string;

  @Column({ length: 50 })
  vehicleType: string;

  @Column({ length: 150 })
  initial: string;

  @Column({ length: 150 })
  finish: string;

  @Column({ length: 100 })
  destination: string;

  @Column({ length: 100 })
  origin: string;

  @Column({ length: 100 })
  value: string;

  @Column({ length: 4 })
  codeInitial: string;

  @Column({ length: 4 })
  codeFinish: string;

  @Column({ length: 50 })
  create_at: string;

  @Column({ length: 50 })
  delete_at: string;

  @Column({ length: 50, default: '1' })
  isVisible: string;
}
