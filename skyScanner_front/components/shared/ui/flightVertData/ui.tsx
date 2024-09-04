
import React, { FC, memo, useMemo } from 'react'
import styles from './styles.module.scss';
import { IoAirplaneSharp } from 'react-icons/io5';
import { ITrip } from '../../api/trip';
import { msToHoursAndMinutes, sliceCity } from '../../lib/flight';
import { CityKeys } from '../../api/city/types';
import { useTranslation } from 'next-i18next';

interface FlightVertData {
  trip:ITrip
}

export const FlightVertData:FC<FlightVertData> = memo(({trip}) => {

  const {start, end,hours,minutes} =  useMemo(()=> msToHoursAndMinutes(+trip.departure_time,+trip.arrival_time), [trip])
  const { t } = useTranslation();

  const lang  = t('city.lang') as CityKeys
  return (
    <div className={styles.body}>
      <div className={styles.hours}>{hours}h{minutes}</div>
      <div className={styles.info}>
        <span className={styles.span}></span>
        <div className={styles.data}>{start} {sliceCity(trip.departure_city.name[lang])} {trip.departure_city.name[lang]}</div>
        <div className={styles.data}>{end} {sliceCity(trip.arrival_city.name[lang])} {trip.arrival_city.name[lang]}</div>
      </div>

    </div>
  )
})
