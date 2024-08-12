import { createSlice } from '@reduxjs/toolkit'
import { ITripListState } from './types'
import { fetchTrips } from './tripThunk'




const initialState: ITripListState = {
    trips: null,
    loading: false,
    error: null,
}

const TripsSlice = createSlice({
    name: 'trip',
    initialState,
    reducers: {
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchTrips.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchTrips.fulfilled, (state, action) => {
              console.log('cc', action);
              
                state.trips = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchTrips.rejected, (state, action) => {
                state.loading = false
                state.error = null
            }),
})

export default TripsSlice.reducer
