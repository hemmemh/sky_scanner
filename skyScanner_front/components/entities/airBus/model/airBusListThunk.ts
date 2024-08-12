import { getAllAirBus } from '@/components/shared/api/airbus/airbus'
import { ErrorType } from '@/components/shared/types/errorTypes'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface IFetchBookList {
    /** Search string for a selection of books. */
    readonly search: string
    /** Page number to receive new items. */
    readonly page: number
}

export const fetchAirBusList = createAsyncThunk('airBus/getAll', async () => {
    try {
        console.log('TTT');
        const response = await getAllAirBus()
       
        
        return response
    } catch (err) {
        const knownError = err as ErrorType

        return  null
    }
})
