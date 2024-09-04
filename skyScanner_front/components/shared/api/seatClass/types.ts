import { ITrip } from "../trip";

export interface ISeatClass {
    uid: string;
    name: SeatClassName
    multiplier: number
    trips: ITrip[]
}

export interface SeatClassName {
    ru:string,
    en:string,
    de:string
}

export type SeatClassKeys = keyof SeatClassName;