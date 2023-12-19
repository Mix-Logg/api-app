import { Entity, Column, PrimaryGeneratedColumn , UpdateDateColumn, CreateDateColumn, } from 'typeorm';

@Entity()
export class Driver {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ length: 200 })
    email: string;

    @Column({ length: 11 })
    phone: string;

    @Column({ length: 1, default:'0' })
    cadastralStatus: string;

    @Column({type: "timestamp", default:null})
    create_at: Date;

    @Column({type: "timestamp", default:null, })
    update_at: Date;

    @Column({ type: "timestamp", default:null, })
    delete_at: Date;
}
