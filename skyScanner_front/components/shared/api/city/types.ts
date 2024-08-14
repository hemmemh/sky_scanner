import { ITrip } from "../trip";

export interface ICity {
    uid: string,
    name: CityName,
    departure_trips: ITrip[],
    arrival_trips: ITrip[],
}

export interface CityName {
    ru:string,
    en:string,
    de:string
}

export type CityKeys = keyof CityName;