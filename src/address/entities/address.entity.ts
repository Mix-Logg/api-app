import { Entity, Column, PrimaryGeneratedColumn , UpdateDateColumn, CreateDateColumn, } from 'typeorm';

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ length: 25 })
    am: string;

    @Column()
    uuid: number;

    @Column({ length: 8 })
    zipCode: string;

    @Column({ length: 150 })
    street: string;

    @Column()
    number: number;

    @Column({ length: 80, default:null })
    complement: string;

    @Column({ length: 60 })
    district: string;

    @Column({ length: 40, default: null })
    city: string;

    @Column({ length: 2 })
    uf: string;


    // ######TIMESTAMP###### \\

    @Column({ length: 1, default:'0' })
    situacaoCadastral: string;

    @CreateDateColumn({type: "timestamp"})
    create_at: Date;

    @UpdateDateColumn({type: "timestamp", default:null, })
    update_at: Date;

    @Column({ type: "timestamp", default:null, })
    delete_at: Date;
}
