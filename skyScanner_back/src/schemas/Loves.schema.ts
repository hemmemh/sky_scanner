
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "./User.schema";
import { Trip } from "./Trip.schema";


@Entity()
export class Loves {
    @PrimaryGeneratedColumn('uuid')
    uid: string;



    @ManyToMany(() => Trip,  {eager:true,onDelete:'CASCADE'})
    @JoinTable()
    from: Trip[]

    @Column({type:'json', default:[]})
    from_positions: string[]
  

    @Column({type:'json', default:[]})
    to_positions: string[]

    @ManyToMany(() => Trip, {eager:true,onDelete:'CASCADE'})
    @JoinTable()
    to: Trip[]

    @CreateDateColumn()
    createdAt: Date;


    @ManyToOne(() => User, (user) => user.loves, {onDelete:'CASCADE'})
    user: User



}