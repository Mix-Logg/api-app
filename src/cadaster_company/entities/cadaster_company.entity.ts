import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    DeleteDateColumn,
  } from 'typeorm';

@Entity()
export class CadasterCompany {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    uuid: number;
  
    @Column({ length: 50 })
    corporateName: string;

    @Column({ length: 50 })
    areaActivity: string;

    @Column({ length: 150 })
    email: string;

    @Column({ length: 50})
    companyTelephone: string; 
  
    @CreateDateColumn({ type: 'timestamp'})
    create_at: Date;
  
    @CreateDateColumn({ type: 'timestamp', default: null })
    update_at: Date;
  
    @DeleteDateColumn({ type: 'timestamp', default: null })
    delete_at: Date;

}
