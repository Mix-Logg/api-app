import { Entity, Column, PrimaryGeneratedColumn  } from 'typeorm';

@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_admin: number;
    
    @Column()
    id_driver: number;

    @Column()
    id_vehicle: number;

    @Column()
    id_auxiliary: number;

    @Column({ default:null })
    delete_at: string;
    
    @Column()
    create_at: string;

    @Column({ default:null })
    update_at: string;


}
