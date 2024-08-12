'use client'
import React, { FC, memo } from 'react'
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

import { UseLoves } from '@/components/shared/lib/loves/useLoves';


interface FlightCard {
  data:[ITrip[], ITrip[]] | ITrip[]
}

const Infos:FC<FlightCard> = memo(({data})=>{
  if (isTripsPairs(data)) {
    return (
      <>
      <div className={styles.info}>
 
 <div className={styles.info__company}>{data[0][0].company.name}</div>
 <FlightData data={data[0]}/>


  </div> 
  <div className={styles.info}>
 
 <div className={styles.info__company}>{data[1][0].company.name}</div>
 <FlightData data={data[1]}/>


  </div>
</>
    )
  }else{
    return (
      <div className={styles.info}>
         
      <div className={styles.info__company}>{data[0].company.name}</div>
      <FlightData data={data}/>
       </div> 
    )
  }

})

const Price:FC<FlightCard>= memo(({data})=>{
  if (isTripsPairs(data)) {
    const firstPrice = data[0].reduce((prev:number, current:ITrip)=>prev + current.price,0)
    const secondPrice = data[1].reduce((prev:number, current:ITrip)=>prev + current.price,0)
    return   <div className={styles.actions__price}>{firstPrice + secondPrice}₽</div>
  }else{
    const price = data.reduce((prev:number, current:ITrip)=>prev + current.price,0)
    return   <div className={styles.actions__price}>{price}₽</div>
  }
})



export const FlightCard:FC<FlightCard> = memo(({data}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useTranslation();
  const {addToLovesButton, deleteLovesButton, loved} = UseLoves(data)

  const selectTrip = ()=>{
    if (isTripsPairs(data)) {
      console.log('data[0].join(',')', data[0].join(','));
      
      router.push(`../../flight/${data[0].map(el=>el.uid).join(',')}/${data[1].map(el=>el.uid).join(',')}`)
    }else{
      router.push(`flight/${data.map(el=>el.uid).join(',')}`)
    }
 
  }





  return (
     <div className={styles.main}>
      <div className={styles.body}>
        <div className={styles.infos}>
          <Infos data={data}/>
        </div>

        <div className={styles.actions}>
          <div className={styles.actions__body}>
             <Price data={data}/>
             <Button onClick={selectTrip} variant="contained" endIcon={<FaArrowRightLong/>}>{t('tripData.select')}</Button>
          </div>
          <div className={styles.actions__favorite}>
          {loved ?
                   <IconButton onClick={deleteLovesButton}   aria-label="delete">
                      <MdFavorite /> 
                    </IconButton>
        :
        <IconButton onClick={addToLovesButton} aria-label="delete">
        <MdFavoriteBorder />
         </IconButton>
          }
    
          
          </div>
        </div>
      </div>
     </div>
  )
})
