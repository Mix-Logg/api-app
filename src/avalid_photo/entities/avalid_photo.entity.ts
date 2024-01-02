import { Entity, Column, PrimaryGeneratedColumn , CreateDateColumn, DeleteDateColumn, } from 'typeorm';

@Entity()
export class AvalidPhoto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uuid: number;

    @Column({ type:'date' })
    id_admin: Date;

    @Column({ length: 20 })
    am: string;

    @Column({ length: 1 })
    valid: string;

    @Column({ length: 20  })
    photo: string;

    @CreateDateColumn({type: "timestamp", default:null,})
    create_at: Date;

    @DeleteDateColumn({type: "timestamp", default:null, })
    delete_at: Date;
}
