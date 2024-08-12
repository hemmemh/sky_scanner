'use client'
import React from 'react'
import styles from './styles.module.scss'
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { Title } from '@/components/shared/ui/title';
import { IconButton } from '@mui/material';
import { getTripData } from '@/components/shared/lib/flight/getTripData';
import { useAppSelector } from '@/components/shared/lib/store';
import { selectTrips } from '@/components/entities/Trip';
import { UseLoves } from '@/components/shared/lib/loves/useLoves';
export const Top = () => {


    const {cityName, seatClass, seatNumber} = getTripData()
    const trips = useAppSelector(selectTrips)
    const {addToLovesButton, deleteLovesButton, loved} = UseLoves(trips)
  return (
    <div className={styles.main}>
        <div className='container'>
            <div className={styles.body}>
                <div className={styles.info}>
                    <Title size='xl'>Frankfurt</Title>
                    <div className={styles.allInfo}>1 adult•Return•Economy class</div>
                </div>
                <div className={styles.favorite}>
                    {loved &&  <IconButton onClick={deleteLovesButton} ><MdFavorite color='white'/></IconButton>}
                    {!loved &&  <IconButton onClick={addToLovesButton} ><MdFavoriteBorder color='white'/></IconButton>}
                  
                </div>
            </div>
        </div>
    </div>
  )
}
