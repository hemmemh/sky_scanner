import { ITrip } from "../trip";

export interface IAirBus {

    uid: string,
    name: string,
    trips: ITrip[],
}

