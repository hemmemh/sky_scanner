import { getAllAirBus } from '@/components/shared/api/airbus/airbus'
import { createILoves, ILoves } from '@/components/shared/api/loves'
import { deleteLoves } from '@/components/shared/api/loves/loves'
import { createOrder } from '@/components/shared/api/order/order'

import { IOrder } from '@/components/shared/api/order/types'
import { IUser } from '@/components/shared/api/user/types'

import { deleteUser, getProfile, logout } from '@/components/shared/api/user/user'
import { ErrorType } from '@/components/shared/types/errorTypes'
import { createAsyncThunk } from '@reduxjs/toolkit'



export const verifyUser = createAsyncThunk('user/getProfile', async () => {
    try {
   
        const response = await getProfile()
       
        
        return response
    } catch (err) {
        const knownError = err as ErrorType

        return  null
    }
})

export const logoutUser = createAsyncThunk('user/logout', async () => {
    try {
       console.log('bb');
       
        const response = await logout()
       
        
        return response
    } catch (err) {
        const knownError = err as ErrorType

        return  null
    }
})


export const deleteUserAction = createAsyncThunk('user/deleteUserAction', async (user:IUser) => {
    try {

       
        const response = await deleteUser(user)
       
        
        return response
    } catch (err) {
        const knownError = err as ErrorType

        return  null
    }
})

export const addOrderAction = createAsyncThunk('user/addOrder', async (order:Partial<IOrder>) => {
    try {
        const response = await createOrder(order)
        return response
    } catch (err) {
        const knownError = err as ErrorType

        return  null
    }
})


export const addLovesAction = createAsyncThunk('user/addLoves', async (loves:Partial<ILoves>) => {
    try {
        const response = await createILoves(loves)
        return response
    } catch (err) {
        const knownError = err as ErrorType

        return  null
    }
})


export const deleteLovesAction = createAsyncThunk('user/deleteLoves', async (id:string) => {
    try {
        const response = await deleteLoves(id)
        console.log('res', response);
        
        return response
    } catch (err) {
        const knownError = err as ErrorType

        return  null
    }
})
