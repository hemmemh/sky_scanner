import { createSlice, PayloadAction } from '@reduxjs/toolkit'


import {  IUserState } from './types'
import { logoutUser, verifyUser } from './userThunk'
import { IUser } from '@/components/shared/api/user'
import { addLovesReducer, addOrderReducer, deleteLovesReducer, deleteUserReducer, verifyUserReducer } from './extraReducers'


const initialState: IUserState = {
    user: null,
    loading: false,
    error: null,
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
       setPofile:(state, action: PayloadAction<IUser>)=>{
          state.user = action.payload
       },
       logout:(state)=>{
        localStorage.removeItem('access_token')
        state.user = null
        window.location.replace('http://localhost:3000/home')
     }
    },
    extraReducers: (builder) =>{
        verifyUserReducer(builder)
        deleteUserReducer(builder)
        addOrderReducer(builder)
        addLovesReducer(builder)
        deleteLovesReducer(builder)
    }
})

export const { setPofile, logout } = UserSlice.actions
export default UserSlice.reducer
