'use client'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss';

import { BiSolidPlaneAlt } from "react-icons/bi";
import { Input } from '@/components/shared/ui/input';
import dayjs, { Dayjs } from 'dayjs';
import { DateCalendar} from '@mui/x-date-pickers';
import clsx from 'clsx';
import { Button } from '@mui/material';
import { Autocomplete } from '@/components/shared/ui/autocomplete';
import { DatePicker } from '@/components/shared/ui/datePicker/ui';
import { SeatPicker } from '@/components/shared/ui/seatPicker';
import { useAppDispatch, useAppSelector } from '@/components/shared/lib/store';
import { fetchCityList, selectCityList } from '@/components/entities/cityList';
import { fetchSeatClassList, selectSeatClassList } from '@/components/entities/seatClassList';
import { ISeatClass } from '@/components/shared/api/seatClass';
import { useRouter } from 'next/navigation';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Info, panelInputLabel } from '@/components/shared/types/tripsTypes';
import { ICity } from '@/components/shared/api/city';
import { useTranslation } from 'react-i18next';
import { UseRoutePanel } from '@/components/shared/lib/routePanel/useRoutePanel';
import { MySnackBar } from '@/components/shared/ui/snackBar/ui';
dayjs.extend(utc)
dayjs.extend(timezone)


export const RoutePanel = () => {

  
  const [snackBarOpen, setSnackBarOpen] = useState(false)
  const router = useRouter()
  const { t } = useTranslation();
  const {
    depart,
    info,
    returnState,
    fromCityList, 
    toCityList, 
    validation,
    onSeatChange, 
     onCityFromChange,
     onCityToChange,
     onDepartChange,
     onReturnChange,
  checkValidation,
validationState} = UseRoutePanel()



const findTrips = ()=>{
  checkValidation(info, depart)
  console.log(validation);
  if(!Object.entries(validation.current).every(el=>el[1] === true)){
    setSnackBarOpen(true)
    return
  }

  
  if (returnState) {
    router.push(`flights/${depart}/${returnState}/?from=${info.from}&to=${info.to}&seatNumber=${info.seatNumber}&seatClass=${info.seatClass}&sort=${info.sort}`)
  }else{
    router.push(`flights/${depart}?from=${info.from}&to=${info.to}&seatNumber=${info.seatNumber}&seatClass=${info.seatClass}&sort=${info.sort}`)
  }
 

  
}

  return (
    <div className={styles.main}>
        <div className={styles.body}>
          <Autocomplete 
           isValid={validationState.from} 
           items={fromCityList.map(el=>el.name)} 
           className={styles.first}  
           label={t('chooseRoute.from')} 
           placeholder={t('chooseRoute.city')} 
           onChange={onCityFromChange}/>

          <Autocomplete 
           isValid={validationState.to} 
           items={toCityList.map(el=>el.name)} 
           label={t('chooseRoute.to')} 
           placeholder={t('chooseRoute.city')} 
           onChange={onCityToChange}/>

          <DatePicker 
           isValid={validationState.depart} 
           value={dayjs(depart)} 
           label={t('chooseRoute.depart')} 
           onChange={onDepartChange}/>

          <DatePicker 
           value={returnState ? dayjs(returnState) : null} 
           label={t('chooseRoute.return')} 
           onChange={onReturnChange}/>

          <SeatPicker  
           onChange={(e)=>onSeatChange(e.seatNumber, e.seatClass)}  
           className={styles.last} label={t('chooseRoute.classAndPlaces')} 
           placeholder={t('chooseRoute.classAndPlacesPlaceHolder')} />
        </div>
        <Button onClick={findTrips}   variant="contained">{t('chooseRoute.find')}</Button>

        <MySnackBar 
         onChange={setSnackBarOpen} 
         open={snackBarOpen} 
         vertical='bottom' 
         horizontal='center' 
         message={'Заполните поля'}/>
    </div>
  )
}
