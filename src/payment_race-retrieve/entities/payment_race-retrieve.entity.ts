import { Entity, Column, PrimaryGeneratedColumn  } from 'typeorm';

@Entity()
export class PaymentRaceRetrieve {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    id_race: number;

    @Column()
    id_client: number;

    @Column()
    webhookId: string;

    @Column()
    value: string;

    @Column({length: 50 })
    motion: string;

    @Column()
    tax: number;

    @Column({length: 50 })
    create_at: string;
}
