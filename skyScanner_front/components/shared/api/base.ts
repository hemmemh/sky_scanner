import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'



const apiInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });



  apiInstance.interceptors.request.use((config) => {
    const token =localStorage.getItem('access_token') ?? ''
    config.headers.Authorization = `Bearer ${token}`
    return config
  }, (error) => {
    return Promise.reject(error)
  })


  apiInstance.interceptors.response.use((response)=>{
   return response.data
  })


  



export default apiInstance
