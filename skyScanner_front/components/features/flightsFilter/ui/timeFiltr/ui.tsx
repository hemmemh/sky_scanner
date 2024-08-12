import React, { memo, SyntheticEvent, useEffect, useRef, useState } from 'react'
import { selectMaxDepartureTime, selectMaxTime, selectMinDepartureTime, selectMinTime, selectPage } from '@/components/entities/TripList';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Slider, Typography } from '@mui/material';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/components/shared/lib/store';
import { getHoursAndMinutes, getHoursFromMs } from '@/components/shared/lib/flight/day';
import { setPage } from '@/components/entities/TripList/model/tripListSlice';

export const TimeFiltr = memo(() => {
  const [time, setTime] = useState<number[]>([0, 0])
  const [timeView, setTimeView] = useState<number[]>([0, 0])
  const timeFirstUpdate = useRef(true)
  const [rangeTime, setRangeTime] = useState<number[]>([0, 0]);
  const minTime = useAppSelector(selectMinTime)
  const maxTime = useAppSelector(selectMaxTime)
  const page = useAppSelector(selectPage)
  const useDispatch = useAppDispatch()
  const { t } = useTranslation();
  const pathname = usePathname()
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
      setRangeTime([minTime, maxTime])
      const timeParam = searchParams.get('time') ? searchParams.get('time')?.split('%2C')  : []
      
 if (timeParam?.length === 0) {
    setTime([minTime, maxTime])
    setTimeView([minTime, maxTime])
   }

    
    
   
    }, [minTime, maxTime])


    useEffect(() => {
 
      const currentParams = new URLSearchParams(searchParams.toString());

      


      if (!timeFirstUpdate.current) {
        currentParams.set('time', time.join('%2C'));
        currentParams.set('page',String(page));
        router.push(`${pathname}?${currentParams.toString()}`, {scroll:false});
      }

    
   
    }, [time])


    useEffect(() => {
      const timeParam = searchParams.get('time') ? searchParams.get('time')?.split('%2C') : []


      if (timeParam && timeParam.length !== 0) {
         setTime([+timeParam[0], +timeParam[1]])
         setTimeView([+timeParam[0], +timeParam[1]])
      }
   
   
    }, [])
    




    const onTimeChange = (event: Event | SyntheticEvent<Element, Event>, value: number | number[])=>{
      timeFirstUpdate.current = false
      useDispatch(setPage(1))
      setTime(value as number[])
}

const onTimeViewChange = (event: Event | SyntheticEvent<Element, Event>, value: number | number[])=>{

  setTimeView(value as number[])
}




  return (
    <div className={styles.outBound}>
    <div className={styles.slider_values}>
       <Typography className={styles.text} id="non-linear-slider" gutterBottom>
        {getHoursFromMs(time[0])} {t('tripFilter.hours')}
        </Typography> 

        <span></span>

        <Typography className={styles.text} id="non-linear-slider" gutterBottom>
        {getHoursFromMs(time[1])} {t('tripFilter.hours')}
        </Typography>

       </div>   
   <Slider
      step={360000}
      min={rangeTime[0]}
      max={rangeTime[1]}
      value={timeView}
      valueLabelFormat={getHoursFromMs}
      onChange={onTimeViewChange}
      onChangeCommitted={onTimeChange}
      valueLabelDisplay="auto"

   />
   </div>
  )
})

