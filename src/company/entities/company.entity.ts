import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  corporateName: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 11 })
  companyTelephone: string;

  @Column({ length: 14 })
  cnpj: string;

  @Column({ length: 50 })
  branchActivity: string;

  @CreateDateColumn({ type: 'timestamp' })
  create_at: Date;

  @CreateDateColumn({ type: 'timestamp', default: null })
  update_at: Date;

  @DeleteDateColumn({ type: 'timestamp', default: null })
  delete_at: Date;
}
