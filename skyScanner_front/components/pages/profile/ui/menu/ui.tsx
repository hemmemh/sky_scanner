'use client'
import { FlightCard } from '@/components/entities/flightCard'
import { FlightsFilter } from '@/components/features/flightsFilter/ui'
import { FlightsSort } from '@/components/features/flightsSort'
import firstLogo from '@/public/images/booking-logo.svg'
import secondLogo from '@/public/images/hotels-logo.svg'
import thirdLogo from '@/public/images/trip-logo.svg'
import React, { useContext } from 'react'
import styles from './styles.module.scss';
import Image from 'next/image';
import { Title } from '@/components/shared/ui/title'
import { Button } from '@mui/material'
import { Add } from '@/components/shared/ui/add'
import { HiMiniUser } from 'react-icons/hi2'
import { IoIosArrowForward } from 'react-icons/io'
import { MdOutlineAirplaneTicket } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '@/components/shared/lib/store'
import { logout, logoutUser, selectUser } from '@/components/entities/user'

import { useTranslation } from 'react-i18next'
import { OptionMenuContext } from '@/components/shared/ui/optionMenuProvider/ui'

export const Menu = () => {
  const user = useAppSelector(selectUser)
  const useDispatch = useAppDispatch()
  const { setOption } = useContext(OptionMenuContext);
  const { t } = useTranslation();

  const onLogoutClick = () =>{
    console.log('ckuick');
    
    useDispatch(logout())
  }


  return (
    <div className={styles.main}>
      <div className={styles.body}>
        <div className={styles.user}>
          <Title className={styles.titleColor} color='#000' size='large'>{t(`profile.hiThere`)}</Title>
          <div className={styles.mail}>{user?.email}</div>
        </div>
        <div className={styles.nav}>
          <div onClick={()=>setOption(1)}  className={styles.navItem}>
          <div className={styles.navItem__icon}>
          <HiMiniUser />
          </div>
          <div className={styles.navItem__text}>{t(`profile.account`)}</div>
           <div className={styles.navItem__arrow}>
           <IoIosArrowForward />
           </div>
          </div>
          <div onClick={()=>setOption(2)} className={styles.navItem}>
          <div className={styles.navItem__icon}>
          <MdOutlineAirplaneTicket />
          </div>
          <div  className={styles.navItem__text}>{t(`profile.yourBookings`)}</div>
           <div className={styles.navItem__arrow}>
           <IoIosArrowForward />
           </div>
          </div>
        </div>
        <div className={styles.logout}>
          <Button onClick={onLogoutClick}>{t(`profile.logOut`)}</Button>
        </div>
      </div>
    </div>
  )
}
