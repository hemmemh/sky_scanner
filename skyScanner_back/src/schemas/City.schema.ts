
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Trip } from "./Trip.schema";
import { CityName } from "src/flight/city/models/cityName";


@Entity()
export class City {
    @PrimaryGeneratedColumn('uuid')
    uid: string;

    @Column({type:'json', default:{}})
    name: CityName


    @OneToMany(() => Trip, (trip) => trip.departure_city, {cascade:true})
    departure_trips: Trip[]


    @OneToMany(() => Trip, (trip) => trip.arrival_city, {cascade:true})
    arrival_trips: Trip[]
}