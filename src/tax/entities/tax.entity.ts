import { Entity, Column, PrimaryGeneratedColumn  } from 'typeorm';

@Entity()
export class Tax {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    km_motorcycle: number;
    
    @Column()
    km_tour: number;

    @Column()
    km_util: number;

    @Column()
    km_van: number;

    @Column({ default:null })
    km_vuc: string;
    
    @Column()
    pix_clientPaid: string;

    @Column()
    pix_clientRetrieve: string;

    @Column()
    pix_driverRetrieve: string;

    @Column()
    pix_driverDefault: string;

    @Column({ default:null })
    update_at: string;

}
