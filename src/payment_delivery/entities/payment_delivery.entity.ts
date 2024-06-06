import { Entity, Column, PrimaryGeneratedColumn , UpdateDateColumn, CreateDateColumn, } from 'typeorm';

@Entity()
export class PaymentDelivery {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_user: number;

    @Column({length: 50})
    amount_out: string;

    @Column({length: 200})
    pix: string;

    @Column({length: 20})
    type: string;

    @Column({length: 50, default: null})
    tax: string;

    @Column({length: 50 })
    taxPix: string;

    @Column({length: 50 })
    taxFull: string;

    @Column()
    create_at: string;
    
}
