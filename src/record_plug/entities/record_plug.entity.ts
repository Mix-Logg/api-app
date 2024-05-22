import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class RecordPlug {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  id_admin: number;

  @Column()
  uuid: number;

  @Column({ length: 20 })
  am: string;

  @Column()
  timeline: number;

  @Column({ length: 50})
  operation: string;

  @Column({ length: 1, default: null})
  aproved: string;

  @Column({ length: 50, default: null})
  motion: string;

  @Column({ length: 50, default: null})
  occurrence: string;

  @Column({ length: 150 })
  email: string;

  @CreateDateColumn({ type: 'timestamp'})
  create_at: Date;

  @CreateDateColumn({ type: 'timestamp', default: null })
  update_at: string;

  @DeleteDateColumn({ type: 'timestamp', default: null })
  delete_at: string;
}
