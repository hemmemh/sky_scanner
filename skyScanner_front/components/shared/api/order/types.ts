import { ITrip } from "../trip";
import { IUser } from "../user";

export interface IOrder {
   
    uid: string;
    from: ITrip[]
    to: ITrip[]
    createdAt:Date
    user: IUser
}

