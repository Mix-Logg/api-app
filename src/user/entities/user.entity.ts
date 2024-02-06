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

    @CreateDateColumn({type: "timestamp"})
    create_at: Date;

    @UpdateDateColumn({type: "timestamp", default:null, })
    update_at: Date;

    @Column({ type: "timestamp", default:null, })
    delete_at: Date;
}
