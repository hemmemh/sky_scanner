'use client'
import { useSearchParams } from 'next/navigation'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { ISeatClass } from '../../api/seatClass'
import { selectTrips } from '@/components/entities/Trip'
import { useAppDispatch, useAppSelector } from '../store'
import { getOneSeatClass } from '../../api/seatClass/seatClass'
import { ITrip } from '../../api/trip'
import { isTripsPairs } from '../../quards/guards'
import { addLovesAction, addOrderAction, deleteLovesAction, selectUser } from '@/components/entities/user'

type UseOrder = ITrip[] | [ITrip[], ITrip[]] | null

export const UseOrder = (trips:UseOrder) => {

  const [snackBarOpen, setSnackBarOpen] = useState(false)
  const [snackBarMessage, setSnackBarMessage] = useState('')

  const useDispatch = useAppDispatch()

  const user = useAppSelector(selectUser)

  

  const addToOrder = useCallback(()=>{
    if (!user) {
      setSnackBarOpen(true)
      setSnackBarMessage('Не авторизован')
      return
    }
    if (user && trips) {
       if(isTripsPairs(trips)){
        const to_positions = trips[1].map(el=>el.uid)
        const from_positions = trips[0].map(el=>el.uid)
        useDispatch(addOrderAction({user, from:trips[0], to:trips[1], to_positions, from_positions})).then(data=>{
          setSnackBarOpen(true)
          setSnackBarMessage('Успешное офромление билета')
        }).catch(error=>{
          setSnackBarOpen(true)
          setSnackBarMessage(error.data.response.message)
        })
    
       }else{
        const to_positions = trips.map(el=>el.uid)
        useDispatch(addOrderAction({user, from:trips, to_positions})).then(data=>{
          setSnackBarOpen(true)
          setSnackBarMessage('Успешное офромление билета')
        }).catch(error=>{
          setSnackBarOpen(true)
          setSnackBarMessage(error.data.response.message)
        })
       }
    }
   
  },[user, trips])
  
  const isOrderPayed = useCallback(()=>{

    
    if(!trips || !user) return false
     console.log('trips', trips, user.orders);
     
    if(isTripsPairs(trips)){

     const finded =  user.orders.find(order=>{
        const fromOrder = order.from.every(trip=>{
 
           const findedTrip = trips[0].find(el=>el.uid === trip.uid)
           if (!findedTrip) return false
           return true
        })

        const toOrder = order.to.every(trip=>{
          const findedTrip = trips[1].find(el=>el.uid === trip.uid)

          if (!findedTrip)return false
          return true
       })
       return fromOrder && toOrder
      })

      if (finded) {
        return true
      }else{
        return false
      }
    }else{
      const finded =   user.orders.find(order=>{
        return order.from.every(trip=>{
          const findedTrip = trips.find(el=>el.uid === trip.uid)
   
           if (!findedTrip)return false
           return true
        })

 
      })
    
      if (finded) {
        return true
      }else{
        return false
      }
    }

   
  },[user, trips])

  const payedOrder = useMemo(()=>isOrderPayed(), [isOrderPayed])

  return {addToOrder, setSnackBarMessage, payedOrder, snackBarOpen, snackBarMessage, setSnackBarOpen}
}
