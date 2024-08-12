
import apiInstance from '../base'
import { IToken, IUser } from './types'


const BASE_URL = 'user'

export const login = (login:Pick<IUser,'email' | 'password'>): Promise<IToken> => {
    return apiInstance.post(`${BASE_URL}/login`, login)
}

export const deleteUser = (user:IUser): Promise<IToken> => {
    return apiInstance.delete(`${BASE_URL}/${user.uid}`)
}

export const logout = (): Promise<IToken> => {
    return apiInstance.get(`${BASE_URL}/logout`,{withCredentials: true})
}

export const registration= (registration:Pick<IUser,'email' | 'password'>): Promise<IToken> => {
    return apiInstance.post(`${BASE_URL}/registration`, registration)
}

export const getProfile= (): Promise<IUser> => {
    return apiInstance.get(`${BASE_URL}/getProfile`)
}
