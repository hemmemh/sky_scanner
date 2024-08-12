import { FlightCard } from '@/components/entities/flightCard'
import { FlightsFilter } from '@/components/features/flightsFilter/ui'
import { FlightsSort } from '@/components/features/flightsSort'
import firstLogo from '@/public/images/booking-logo.svg'
import secondLogo from '@/public/images/hotels-logo.svg'
import thirdLogo from '@/public/images/trip-logo.svg'
import React from 'react'
import styles from './styles.module.scss';
import Image from 'next/image';
import { Title } from '@/components/shared/ui/title'
import { Button } from '@mui/material'
import { Add } from '@/components/shared/ui/add'
export const Ad = () => {
  return (
    <div className={styles.main}>
     <Add/> 
    </div>
  )
}
