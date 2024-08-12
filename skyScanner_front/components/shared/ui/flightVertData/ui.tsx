
import React, { FC, memo, useMemo } from 'react'
import styles from './styles.module.scss';
import { IoAirplaneSharp } from 'react-icons/io5';
import { ITrip } from '../../api/trip';
import { msToHoursAndMinutes, sliceCity } from '../../lib/flight';

interface FlightVertData {
  trip:ITrip
}

export const FlightVertData:FC<FlightVertData> = memo(({trip}) => {

  const {start, end,hours,minutes} =  useMemo(()=> msToHoursAndMinutes(+trip.departure_time,+trip.arrival_time), [trip])
  return (
    <div className={styles.body}>
      <div className={styles.hours}>{hours}h{minutes}</div>
      <div className={styles.info}>
        <span className={styles.span}></span>
        <div className={styles.data}>{start} {sliceCity(trip.departure_city.name)} {trip.departure_city.name}</div>
        <div className={styles.data}>{end} {sliceCity(trip.arrival_city.name)} {trip.arrival_city.name}</div>
      </div>

    </div>
  )
})
