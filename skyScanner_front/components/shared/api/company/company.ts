
import apiInstance from '../base'
import {ICompany } from './types'

const BASE_URL = 'company'

export const createCompany = (name:string): Promise<ICompany> => {
    return apiInstance.post(`${BASE_URL}`, {name})
}
