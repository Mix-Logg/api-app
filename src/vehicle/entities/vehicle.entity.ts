import { Entity, Column, PrimaryGeneratedColumn , UpdateDateColumn, CreateDateColumn, } from 'typeorm';

@Entity()
export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    uuid: number;

    @Column({ length: 25 })
    cadastre: string;

    @Column({ length: 25 })
    owner: string;

    @Column({ length: 25 })
    type: string;

    @Column({ length: 25 })
    weight: string;
}
