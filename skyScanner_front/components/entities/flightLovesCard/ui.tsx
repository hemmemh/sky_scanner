'use client'
import React, { FC } from 'react'
import styles from './styles.module.scss';
import clsx from 'clsx';
import { IoAirplaneSharp } from "react-icons/io5";
import { Button, IconButton } from '@mui/material';
import { FaArrowRightLong } from "react-icons/fa6";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FlightData } from '@/components/shared/ui/flightData';
import { ITrip } from '@/components/shared/api/trip';
import { isTripsPairs } from '@/components/shared/quards/guards';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/components/shared/lib/store';
import { addLovesAction, deleteLovesAction, selectUser } from '../user';
import { ILoves } from '@/components/shared/api/loves';
import { weekDayAndDatefromMs } from '@/components/shared/lib/flight';
import { monthAndDayFromMs } from '@/components/shared/lib/flight/day';


interface FlightLovesCard {
  loves:ILoves
}




export const FlightLovesCard:FC<FlightLovesCard> = ({loves}) => {

  const user = useAppSelector(selectUser)

  const useDispatch = useAppDispatch()

  const deleteLovesButton = (data:ILoves)=>{
    if (!user) return

    useDispatch(deleteLovesAction(data.uid))

  }

  return (
    <div className={styles.item}>
    <div className={styles.item__top}>
      <div className={styles.cities}>
        <div className={styles.city}>{loves.from[0].departure_city.name }</div>
        {loves.to.length !==0 && <div className={styles.divide}></div>}
        {loves.to.length !==0 && <div className={styles.city}>{loves.to[0].departure_city.name}</div> }
      </div>
    <IconButton  onClick={()=>deleteLovesButton(loves)}   aria-label="delete">
         <MdFavorite /> 
    </IconButton>
    </div>
    <div className={styles.item__flights}>
    <div className={styles.item__component}>

      <FlightData data={loves.from}/>
 </div>
 {loves.to.length !== 0 && 
   <div className={styles.item__component}>
    
        <FlightData data={loves.to}/>
 </div>}
    </div>
    <div className={styles.item__bottom}>
         <div className={styles.item__date}>
         {monthAndDayFromMs(+loves.from[0].departure_time)}
         {loves.to.length !==0 && <div className={styles.divide}></div>}
         </div>
        {loves.to.length !== 0 && 
         <div className={styles.item__date}>
                   {monthAndDayFromMs(+loves.to[0].departure_time)}
    
      </div>}
    </div>
  </div>
  )
}
