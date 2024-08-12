'use client'
import React, { memo } from 'react'
import styles from './styles.module.scss';
import { IoAirplaneSharp } from 'react-icons/io5';
import Image from 'next/image';
import firstLogo from '@/public/images/booking-logo.svg'
import secondLogo from '@/public/images/hotels-logo.svg'
import thirdLogo from '@/public/images/trip-logo.svg'
import { Title } from '../title';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
export const Add = memo(() => {

  const { t } = useTranslation();

  return (
    <div className={styles.item}>
    <div className={styles.logos}>
       <Image src={firstLogo} alt='logo'/>
        <Image src={secondLogo} alt='logo'/>
        <Image src={thirdLogo} alt='logo'/>
    </div>
    <Title color='#000' className={styles.titleColor} size='medium'>{t('advertise.title')}</Title>
    <Title color='#000' className={styles.titleColor} size='text'>{t('advertise.underTitle')}</Title>
    <Button sx={{width:'100%'}} variant='contained'>{t('advertise.exploreHotel')}</Button>
  </div>
  )
})
