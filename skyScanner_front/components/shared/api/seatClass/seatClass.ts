
import apiInstance from '../base'
import { ISeatClass } from './types'


const BASE_URL = 'seat-class'

export const createSeatClass= (name:string): Promise<ISeatClass> => {
    return apiInstance.post(`${BASE_URL}`, {name})
}

export const getOneSeatClass= (id:string): Promise<ISeatClass> => {
  
    
    return apiInstance.get(`${BASE_URL}/getOne/${id}`,)
}

export const getAllSeatClass= (): Promise<ISeatClass[]> => {
    return apiInstance.get(`${BASE_URL}/getAll`)
}
