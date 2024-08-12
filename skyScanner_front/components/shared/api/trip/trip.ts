
import { Info } from '../../types/tripsTypes'
import apiInstance from '../base'
import {getAllData, IGetTrips, IGetTripsWithReturns, ITrip } from './types'

const BASE_URL = 'trip'

export const createTrip = (trip:Partial<ITrip>): Promise<ITrip> => {
    return apiInstance.post(`${BASE_URL}`, trip)
}

export const getAllTripsWithReturns = (query:Info, params:{depart:number, return:number}): Promise<getAllData> => {
    console.log('%%338834');
    return apiInstance.get(`${BASE_URL}/getAllWithReturn/${params.depart}/${params.return}`, {params:query})
}

export const getAllTrips = (query:Info, params:{depart:number}): Promise<getAllData> => {
    console.log('%%3388');
    return apiInstance.get(`${BASE_URL}/getAll/${params.depart}`, {params:query})
}

export const getTripsWithReturns = (params:{depart:string, return:string}): Promise<[ITrip[], ITrip[]]> => {
    console.log('%%33');
    return apiInstance.get(`${BASE_URL}/getTripsWithReturns/${params.depart}/${params.return}`, )
}

export const getTrips = (params:{depart:string}): Promise<ITrip[]> => {
  
    
    return apiInstance.get(`${BASE_URL}/getTrips/${params.depart}`)
}
