
import {  getTrips, getTripsWithReturns } from '@/components/shared/api/trip/trip'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface FetchTrips {
 params:{depart:string, return?:string}
}
export const fetchTrips = createAsyncThunk('trip/getOne', async (data:FetchTrips) => {
  try {

    if ('return' in data.params){
      return await getTripsWithReturns(data.params as {depart:string, return:string})
    } else {

      return await getTrips(data.params)
    }

  } catch (err) {
    console.log(err);
    return  null

  }
})
