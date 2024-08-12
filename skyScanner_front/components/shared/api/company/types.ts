import { ITrip } from "../trip";

export interface ICompany {
    uid: string,
    name: string,
    trips: ITrip[]
}

