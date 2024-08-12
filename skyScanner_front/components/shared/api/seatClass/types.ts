import { ITrip } from "../trip";

export interface ISeatClass {
    uid: string;
    name: string
    multiplier: number
    trips: ITrip[]
}



