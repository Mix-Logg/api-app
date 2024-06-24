import { Entity, Column, PrimaryGeneratedColumn , UpdateDateColumn, CreateDateColumn, } from 'typeorm';
@Entity()

export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 11 })
    cpf: string;

    @Column({ length: 250 })
    password: string;

    @Column({ length: 50 })
    am: string;

    @Column()
    uuid: number;

    @Column({ length: 50, default: '0' })
    amount: string;

    @Column({ length: 50 })
    galaxHash: string;

    @Column()
    galaxId: string;

    @CreateDateColumn()
    create_at: string;

    @UpdateDateColumn({type: "timestamp", default:null, })
    update_at: Date;

    @Column({ type: "timestamp", default:null, })
    delete_at: Date;
}
