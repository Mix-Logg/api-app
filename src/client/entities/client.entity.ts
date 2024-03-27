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
}



