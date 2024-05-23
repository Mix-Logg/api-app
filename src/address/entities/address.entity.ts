import { Entity, Column, PrimaryGeneratedColumn , UpdateDateColumn, CreateDateColumn, } from 'typeorm';

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ length: 25 })
    am: string;

    @Column()
    uuid: number;

    @Column({ length: 8, default: null })
    zipCode: string;

    @Column({ length: 150, default: null })
    street: string;

    @Column({default: null})
    number: number;

    @Column({ length: 80, default:null })
    complement: string;

    @Column({ length: 60, default: null })
    district: string;

    @Column({ length: 40, default: null })
    city: string;

    @Column({ length: 2, default: null })
    uf: string;

    @Column({ length: 50, default: null })
    create_at: string;

    @Column({ length: 50, default: null })
    update_at: string;

    @Column({ length: 50, default: null })
    delete_at: string;
}
