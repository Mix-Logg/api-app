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
    status: string;

    @Column()
    value: string;

    @Column({length: 50 })
    motion: string;

    @Column({length: 200 })
    pix: string;

    @Column({length: 50 })
    type: string;

    @Column()
    tax: number;

    @Column({length: 50 })
    create_at: string;
}
