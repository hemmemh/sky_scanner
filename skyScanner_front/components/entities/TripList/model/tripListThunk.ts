
import { getAllTrips } from '@/components/shared/api/trip'
import { getAllTripsWithReturns } from '@/components/shared/api/trip/trip'

import { Info } from '@/components/shared/types/tripsTypes'
import { createAsyncThunk } from '@reduxjs/toolkit'


interface FetchTripList {
  query:Info,
  params:any
}
export const fetchTripList = createAsyncThunk('trip/getAll', async (data:FetchTripList) => {
    try {
        if('return' in data.params){
           return await getAllTripsWithReturns(data.query, data.params)
        }else{
           return await getAllTrips(data.query, data.params)
        }

    } catch (err) {
        console.log(err);
        return  null

        
    }
})
