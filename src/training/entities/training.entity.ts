import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Training {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_admin: number;

    @Column()
    uuid: number;

    @Column({ length: 50 })
    operation: string;

    @Column({ length: 1 })
    complet: string;

    @Column({ length: 50 })
    am: string;

    @Column({ length: 150 })
    occurence: string;

    @Column()
    date: Date;

    @Column({length: 50})
    create_at: string;

    @Column({ default:null })
    update_at: string;

    @Column({ default:null })
    delete_at: string;
}
