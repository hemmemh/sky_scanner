import { createSlice } from '@reduxjs/toolkit'
import { ISeatClassListState } from './types'
import { fetchSeatClassList } from './seatClassListThunk'




const initialState: ISeatClassListState = {
    seatClasses: [],
    loading: false,
    error: null,
}

const SeatClassListSlice = createSlice({
    name: 'seatClassList',
    initialState,
    reducers: {
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchSeatClassList.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchSeatClassList.fulfilled, (state, action) => {
              console.log('cc', action);
              
                state.seatClasses = action.payload ?? []
                state.loading = false
                state.error = null
            })
            .addCase(fetchSeatClassList.rejected, (state, action) => {
                state.loading = false
                state.error = null
            }),
})

export default SeatClassListSlice.reducer
