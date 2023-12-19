import { Entity, Column, PrimaryGeneratedColumn , UpdateDateColumn, CreateDateColumn, } from 'typeorm';


@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ length: 50 })
    user: string;

    @Column({ length: 200 })
    password: string;

    @Column({ length: 150 })
    email: string;

    @Column({ length: 200, default:null })
    img: string;
    
    @Column({type: "timestamp", default:null})
    log_at: Date;

    @CreateDateColumn({type: "timestamp"})
    create_at: Date;

    @UpdateDateColumn({type: "timestamp", default:null, })
    update_at: Date;

    @Column({ type: "timestamp", default:null, })
    delete_at: Date;
}
