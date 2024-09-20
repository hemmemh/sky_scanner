import { ITrip } from "../trip";
import { IUser } from "../user";

export interface IOrder {
  uid: string;
  from: ITrip[];
  to: ITrip[];
  to_positions: string[];
  from_positions: string[];
  createdAt: Date;
  user: IUser;
}
