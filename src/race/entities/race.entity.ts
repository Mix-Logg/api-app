import { Entity, Column, PrimaryGeneratedColumn , UpdateDateColumn, CreateDateColumn, } from 'typeorm';

@Entity()
export class Race {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, default:'1' })
    isVisible: string;

}
