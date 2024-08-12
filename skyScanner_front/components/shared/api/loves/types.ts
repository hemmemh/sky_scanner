import { ITrip } from "../trip";
import { IUser } from "../user";

export interface ILoves{
   
    uid: string;
    from: ITrip[]
    to: ITrip[]
    createdAt:Date
    user: IUser
    from_positions:string[]
    to_positions:string[]
}

