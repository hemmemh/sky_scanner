

import { getAllSeatClass } from '@/components/shared/api/seatClass/seatClass'
import { createAsyncThunk } from '@reduxjs/toolkit'


export const fetchSeatClassList = createAsyncThunk('seatClass/getAll', async () => {
    try {
        const response = await getAllSeatClass()
        return response
    } catch (err) {
        return  null
    }
})
