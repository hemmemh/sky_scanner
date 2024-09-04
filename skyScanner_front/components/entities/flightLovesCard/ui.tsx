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
import { useTranslation } from 'next-i18next';
import { useAppDispatch, useAppSelector } from '@/components/shared/lib/store';
import { addLovesAction, deleteLovesAction, selectUser } from '../user';
import { ILoves } from '@/components/shared/api/loves';
import { weekDayAndDatefromMs } from '@/components/shared/lib/flight';
import { monthAndDayFromMs } from '@/components/shared/lib/flight/day';
import { CityKeys } from '@/components/shared/api/city/types';


interface FlightLovesCard {
  loves:ILoves
}




export const FlightLovesCard:FC<FlightLovesCard> = ({loves}) => {

  const user = useAppSelector(selectUser)
  const router = useRouter()
  const useDispatch = useAppDispatch()
  const { t } = useTranslation();
  console.log('loves', loves);
  
  const lang  = t('city.lang') as CityKeys
  const deleteLovesButton = (data:ILoves)=>{
    if (!user) return

    useDispatch(deleteLovesAction(data.uid))

  }

  const selectTrip = ()=>{


if (loves?.to) {


router.push(`../../flight/${loves.from_positions.join(',')}/${loves.to_positions.join(',')}?seatNumber=${loves.seatNumber}`)
}else{
router.push(`/flight/${loves.from_positions.join(',')}?seatNumber=${loves.seatNumber}`)
}

}

  return (
    <div className={styles.item}>
    <div className={styles.item__top}>
      <div className={styles.cities}>
        <div className={styles.city}>
        {loves.from[0].departure_city.name[lang]}</div>
        {loves?.to.length !==0 && <div className={styles.divide}></div>}
        {loves?.to.length !==0 && <div className={styles.city}>{loves.to[0].departure_city.name[lang]}</div> }
      </div>
    <IconButton  onClick={()=>deleteLovesButton(loves)}   aria-label="delete">
         <MdFavorite /> 
    </IconButton>
    </div>
    <div className={styles.item__flights}>
    <div className={styles.item__component}>

      <FlightData data={loves.from}/>
 </div>
 {loves?.to.length !== 0 && 
   <div className={styles.item__component}>
    
        <FlightData data={loves.to}/>
 </div>}
    </div>
    <div className={styles.item__bottom}>
       <div className={styles.item__dateCover}>
       <div className={styles.item__date}>
         {monthAndDayFromMs(+loves.from[0].departure_time, t('city.lang'))}
         {loves?.to.length !==0 && <div className={styles.divide}></div>}
         </div>
        {loves?.to.length !== 0 && 
         <div className={styles.item__date}>
                   {monthAndDayFromMs(+loves.to[0].departure_time, t('city.lang'))}
          
    
      </div>}
       </div>
      <Button onClick={selectTrip} className={styles.item__button}>Перейти</Button>
    </div>
  </div>
  )
}
