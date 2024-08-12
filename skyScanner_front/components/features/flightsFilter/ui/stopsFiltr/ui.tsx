import React, { memo, SyntheticEvent, useEffect, useRef, useState } from 'react'
import { selectMaxDepartureTime, selectMaxTime, selectMinDepartureTime, selectMinTime, selectPage} from '@/components/entities/TripList';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Checkbox, FormControlLabel, Slider, Typography } from '@mui/material';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/components/shared/lib/store';
import { getHoursAndMinutes, getHoursFromMs } from '@/components/shared/lib/flight/day';
import { Stop, StopValue } from '@/components/shared/types/tripsTypes';
import { setPage } from '@/components/entities/TripList/model/tripListSlice';


const stopsDefault:Stop[] = [
  {name:'прямой', value:'direct'},
  {name:'1 пересадка', value:'oneTransfer'},
  {name:'2 пересадки', value:'twoTransfer'},
]


export const StopsFiltr = memo(() => {


    const uncheckedStopsFirstUpdate = useRef(true)
    const [stops, setStops] = React.useState<Stop[]>(stopsDefault);
    const [uncheckedStops, setUncheckedStops] = React.useState<Stop[]>([]);
    const page = useAppSelector(selectPage)
    const useDispatch = useAppDispatch()
    const pathname = usePathname()
    const searchParams = useSearchParams();
    const router = useRouter();
    const { t } = useTranslation();
    const searchParamsFirstUpdate = useRef(true)

    
    useEffect(() => {
        const currentParams = new URLSearchParams(searchParams.toString());
  
        
        
  
        if (!uncheckedStopsFirstUpdate.current) {
  
          
          if (uncheckedStops.length > 0) {
            currentParams.set('stops', uncheckedStops.map(el=>el.value).join('%2C'));
            currentParams.set('page',String(page));
          }else{
            currentParams.delete('stops')
          }
          router.push(`${pathname}?${currentParams.toString()}`, {scroll:false});
        }
       
      }, [uncheckedStops])
  

      useEffect(() => {
    
  
     const stopsParam:StopValue[] | undefined = searchParams.get('stops') ? searchParams.get('stops')?.split('%2C') as StopValue[] : []
  
    
  
  
  
     if (stopsParam && stopsParam.length !== 0 && uncheckedStopsFirstUpdate.current) {
  
  
      setUncheckedStops(stops.filter(el=>stopsParam.includes(el.value)))
      setStops(stops.filter(el=>!stopsParam.includes(el.value)))
     }
     
      }, [])


      const onStopChange = (stop:Stop)=>{

        const {name, value } = stop
       const finded = stops.find(el=>el.value === value)
      useDispatch(setPage(1))
      
       if (finded) {
        setStops(stops.filter(el=>el.value !== value))
        setUncheckedStops([...uncheckedStops, {name, value}])
       }else{
        setStops([...stops, {name, value}])
        setUncheckedStops(uncheckedStops.filter(el=>el.value !== value))
       }
        uncheckedStopsFirstUpdate.current = false
  
      }  
  
      const isValueInStop = (value:StopValue) =>{
         const finded = stops.find(el=>el.value === value )
         if (finded) return true
         return false
      }

      return(
        <div className={styles.stops}>
        {stopsDefault.map(el=>
           <FormControlLabel 
           key={el.value}  
           label={t(`tripFilter.${el.value}`)}
           control={    

           <Checkbox checked={isValueInStop(el.value)} onChange={()=>onStopChange(el)}  name={el.name} />
         }
           />
        )}


  
      </div>
      )

})

