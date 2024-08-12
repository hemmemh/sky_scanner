import { createSlice } from '@reduxjs/toolkit'


import { IAirBusListState } from './types'
import { fetchAirBusList } from './airBusListThunk'

const initialState: IAirBusListState = {
    airBuses: null,
    loading: false,
    error: null,
}

const AirBusListSlice = createSlice({
    name: 'airBusList',
    initialState,
    reducers: {
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchAirBusList.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchAirBusList.fulfilled, (state, action) => {
                state.airBuses = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchAirBusList.rejected, (state, action) => {
                state.loading = false
                state.error = null
            }),
})

export default AirBusListSlice.reducer
