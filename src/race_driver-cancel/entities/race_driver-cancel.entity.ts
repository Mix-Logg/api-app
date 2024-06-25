import {
    Entity,
    Column,
    PrimaryGeneratedColumn
  } from 'typeorm';
  
  @Entity()
  export class RaceDriverCancel {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    idDelivery:number;

    @Column({length:50})
    am:string;
  
    @Column()
    idRace:number;
  
    @Column()
    tax:number;
  
    @Column({length: 50})
    create_at: string;

  }
  