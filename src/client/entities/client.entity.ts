import { Entity, Column, PrimaryGeneratedColumn , UpdateDateColumn, CreateDateColumn, } from 'typeorm';

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 11 })
    phone: string;

    @Column({ length: 100 })
    email: string;

    @Column({ length: 200 })
    password: string;

    @Column({ length: 50 })
    create_at: string;

    @Column({ length: 50 })
    update_at: string;

    @Column({ length: 50 })
    delete_at: string;
}



