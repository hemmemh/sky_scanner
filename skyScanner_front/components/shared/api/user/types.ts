import { ILoves } from "../loves";
import { IOrder } from "../order/types";

export interface IUser {
    uid: string;
    email: string
    password: string
    orders: IOrder[]
    loves:ILoves[]

}

export interface IToken {
    access_token:string,
    user:IUser
}



