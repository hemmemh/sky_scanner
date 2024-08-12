import React, { memo, SyntheticEvent, useEffect, useRef, useState } from 'react'

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Slider, Typography } from '@mui/material';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/components/shared/lib/store';
import { getHoursAndMinutes } from '@/components/shared/lib/flight/day';
import { selectMaxDepartureTime, selectMinDepartureTime, selectPage } from '@/components/entities/TripList';
import { setPage } from '@/components/entities/TripList/model/tripListSlice';

export const DepartureTimeFiltr = memo(() => {
    const departureTimeFirstUpdate = useRef(true)
    const [departureTime, setDepartureTime] = useState<number[]>([0, 0]);
    const [departureTimeView, setDepartureTimeView] = useState<number[]>([0, 0]);
    const [rangeDepartureTime, setRangeDepartureTime] = useState<number[]>([0, 0]);
    const minDepartureTime = useAppSelector(selectMinDepartureTime)
    const maxDepartureTime = useAppSelector(selectMaxDepartureTime)
    const page = useAppSelector(selectPage)
    const useDispatch = useAppDispatch()
    const { t } = useTranslation();
    const pathname = usePathname()
    const searchParams = useSearchParams();
    const router = useRouter();



  

    useEffect(() => {
  
   const departTimeParam = searchParams.get('departureTimeFiltr') ? searchParams.get('departureTimeFiltr')?.split('%2C') : []

   if (departTimeParam && departTimeParam.length !== 0) {
    setDepartureTime([+departTimeParam[0], +departTimeParam[1]])
    setDepartureTimeView([+departTimeParam[0], +departTimeParam[1]])
   }


   
    }, [])

    
    useEffect(() => {
 
        const currentParams = new URLSearchParams(searchParams.toString());
        if (!departureTimeFirstUpdate.current) {
      
          currentParams.set('departureTimeFiltr', departureTime.join('%2C'));
          currentParams.set('page',String(page));
          router.push(`${pathname}?${currentParams.toString()}`, {scroll:false});
        }
  
      
     
      }, [departureTime])
  
  
  
      useEffect(() => {
        setRangeDepartureTime([minDepartureTime, maxDepartureTime])
        const departTimeParam = searchParams.get('departureTimeFiltr') ? searchParams.get('departureTimeFiltr')?.split('%2C')  : []
        if (departTimeParam?.length === 0) {
          setDepartureTime([minDepartureTime, maxDepartureTime])
          setDepartureTimeView([minDepartureTime, maxDepartureTime])
        }
        
      
     
      }, [minDepartureTime, maxDepartureTime])

      const onDepartureTimeChange = (event: Event | SyntheticEvent<Element, Event>, value: number | number[])=>{
        departureTimeFirstUpdate.current = false
       useDispatch(setPage(1))
        setDepartureTime(value as number[])
    }


    const onDepartureTimeViewChange = (event: Event | SyntheticEvent<Element, Event>, value: number | number[])=>{
      setDepartureTimeView(value as number[])
  }




    return(
      <div className={styles.outBound}>
      <div className={styles.text}>{t('tripFilter.outbound')}</div>
     <div className={styles.slider_values}>
     <Typography className={styles.text} id="non-linear-slider" gutterBottom>
         { getHoursAndMinutes(departureTime[0])}
         </Typography>
         -
         <Typography className={styles.text} id="non-linear-slider" gutterBottom>
         {getHoursAndMinutes(departureTime[1])}
         </Typography>
        </div>   
    <Slider
    min={rangeDepartureTime[0]}
    max={rangeDepartureTime[1]}
    step={30}
       value={departureTimeView}
       valueLabelFormat={getHoursAndMinutes}
       onChange={onDepartureTimeViewChange}
       onChangeCommitted={onDepartureTimeChange}
       valueLabelDisplay="auto"

    />
    </div>
    )
})

