'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ISeatClass } from '../../api/seatClass'
import { selectTrips } from '@/components/entities/Trip'
import { useAppSelector } from '../store'
import { getOneSeatClass } from '../../api/seatClass/seatClass'
import { ITrip } from '../../api/trip'
import { isTripsPairs } from '../../quards/guards'

export const getTripData = () => {
  const searchParams = useSearchParams()
  const [seatNumber, setSeatNumber] = useState(0)
  const [seatClass, setSeatClass] = useState<ISeatClass | null>(null)
  const [cityName, setCityName] = useState<string>('')
  const trips = useAppSelector(selectTrips)

  useEffect(() => {
    const seatNumberQuery = searchParams.get('seatNumber')
    const seatClassQuery = searchParams.get('seatClass')

  if(seatNumberQuery && seatClassQuery){
     setSeatNumber(+seatNumberQuery)
     getOneSeatClass(seatClassQuery).then(data=>{
      setSeatClass(data)
     })
  }
   
   

  }, [])


  useEffect(() => {
    setCityName(getOutBoundCityName(trips))
  }, [trips])
  

  const getOutBoundCityName = (trips:ITrip[] | [ITrip[], ITrip[]] | null)=>{
      if (!trips) return ''
      if(isTripsPairs(trips)){
          return trips[0][0].departure_city.name
      }else{
          return trips[0].departure_city.name
      }
  }

  const getQuery = ()=>{
    const query:any = {} 
    for (const [key, value] of searchParams.entries()) {
     query[key] = value
     console.log(`${key}, ${value}`, searchParams.entries());
   }
   return query
  }
  return {seatNumber, seatClass, cityName, getQuery}
}
