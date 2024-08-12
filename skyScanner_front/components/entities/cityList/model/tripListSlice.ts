import { createSlice } from '@reduxjs/toolkit'

import { fetchCityList} from './cityListThunk'
import { ICityListState } from './types'



const initialState: ICityListState = {
    cities: [],
    loading: false,
    error: null,
}

const CityListSlice = createSlice({
    name: 'cityList',
    initialState,
    reducers: {
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchCityList.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCityList.fulfilled, (state, action) => {
              console.log('cc', action);
              
                state.cities = action.payload ?? []
                state.loading = false
                state.error = null
            })
            .addCase(fetchCityList.rejected, (state, action) => {
                state.loading = false
                state.error = null
            }),
})

export default CityListSlice.reducer
