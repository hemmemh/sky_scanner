
import apiInstance from '../base'
import { ILoves } from './types'


const BASE_URL = 'loves'

export const createILoves = (loves:Partial<ILoves>): Promise<ILoves> => {
    return apiInstance.post(`${BASE_URL}`, loves)
}

export const getAllILoves = (): Promise<ILoves[]> => {
    return apiInstance.get(`${BASE_URL}/getAll`)
}

export const deleteLoves = (id:string): Promise<ILoves> => {
    return apiInstance.delete(`${BASE_URL}/${id}`)
}
