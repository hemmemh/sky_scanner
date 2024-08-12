import { ITrip } from "../trip";

export interface ICity {
    uid: string,
    name: string,
    departure_trips: ITrip[],
    arrival_trips: ITrip[],
}

