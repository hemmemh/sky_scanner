
import apiInstance from '../base'
import { IOrder } from './types'

const BASE_URL = 'order'

export const createOrder = (order:Partial<IOrder>): Promise<IOrder> => {
    return apiInstance.post(`${BASE_URL}`, order)
}

export const getAllOrder = (): Promise<IOrder[]> => {
    return apiInstance.get(`${BASE_URL}/getAll`)
}
