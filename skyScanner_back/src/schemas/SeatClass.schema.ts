
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Trip } from "./Trip.schema";
import { Path } from "./Path.schema";
import { SeatClassName } from "src/flight/seat-class/models/seatClassName";


@Entity()
export class SeatClass {
    @PrimaryGeneratedColumn('uuid')
    uid: string;

   

    @Column({type:'json', default:{}})
    name: SeatClassName

    @Column()
    multiplier: number

    @OneToMany(() => Trip, (trip) => trip.seatClass, {cascade:true})
    trips: Trip[]
}