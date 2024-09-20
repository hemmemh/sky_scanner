import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Trip } from './Trip.schema';

@Entity()
export class AirBus {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column()
  name: string;

  @OneToMany(() => Trip, (trip) => trip.airBus, { cascade: true })
  trips: Trip[];
}
