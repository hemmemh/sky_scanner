
import apiInstance from '../base'
import { IAirBus } from './types'


const BASE_URL = 'airbus'

export const createAirBus = (name:string): Promise<IAirBus> => {
    return apiInstance.post(`${BASE_URL}`, {name})
}


export const getAllAirBus = (): Promise<IAirBus[]> => {
    return apiInstance.get(`${BASE_URL}`, )
}
