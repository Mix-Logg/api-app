import { Entity, Column, PrimaryGeneratedColumn , UpdateDateColumn, CreateDateColumn, } from 'typeorm';

@Entity()
export class Operation {
    filter(arg0: (item: any) => boolean) {
      throw new Error('Method not implemented.');
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_admin: number;

    @Column({length: 1})
    status: string;

    @Column({length: 20})
    am: string;

    @Column({length: 20})
    operation: string;

    @Column({length: 100, default:null })
    occurrence: string;

    @Column()
    uuid: number;
    
    @Column()
    initial: Date;

    @Column({ default:null })
    finish: Date;

    @Column({ length: 50})
    create_at: string;

    @Column({ length: 50, default:null})
    update_at: string;

    @Column({ length: 50, default:null})
    delete_at: string;
}
