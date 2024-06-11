import { Entity, Column, PrimaryGeneratedColumn  } from 'typeorm';

@Entity()
export class PaymentRace {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    id_race: number;

    @Column()
    id_client: number;

    @Column()
    amount: number;

    @Column({length: 50 })
    status: string;

    @Column({length: 20 })
    type: string;

    @Column({length: 50 })
    create_at: string;
    
}
