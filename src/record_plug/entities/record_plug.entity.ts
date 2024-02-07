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

  @Column({ default: null })
  timeline_fastshop: number;


  // @Column({ length: 1, default: null })
  // approved: string;

  @CreateDateColumn({ type: 'timestamp', default: null })
  lastGenerator: Date;

  @CreateDateColumn({ type: 'timestamp'})
  create_at: Date;

  @CreateDateColumn({ type: 'timestamp', default: null })
  update_at: Date;

  @DeleteDateColumn({ type: 'timestamp', default: null })
  delete_at: Date;
}
