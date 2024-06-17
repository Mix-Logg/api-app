import { Entity, Column, PrimaryGeneratedColumn  } from 'typeorm';

@Entity()
export class Tax {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    default: number;

    @Column()
    km_motorcycle: number;

    @Column()
    motorcycle_min: number;
    
    @Column()
    km_tour: number;

    @Column()
    tour_min: number;

    @Column()
    km_util: number;

    @Column()
    util_min: number;

    @Column()
    km_van: number;

    @Column()
    van_min: number;

    @Column()
    km_vuc: number;

    @Column()
    vuc_min: number;
    
    @Column()
    pix_clientPaid: number;

    @Column()
    pix_clientRetrieve: number;

    @Column()
    pix_driverRetrieve: number;

    @Column()
    pix_driverTaxPixRetrieve: number;

    @Column()
    pix_driverPaymentDefault: number;

    @Column({ default:null })
    update_at: string;

}
