

import { getAllCity } from '@/components/shared/api/city/city'
import { createAsyncThunk } from '@reduxjs/toolkit'


export const fetchCityList = createAsyncThunk('city/getAll', async () => {
    try {
        const response = await getAllCity()
        return response
    } catch (err) {
        return  null
    }
})
