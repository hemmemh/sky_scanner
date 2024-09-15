'use client'

import React, { useContext } from 'react'
import styles from './styles.module.scss';
import { Title } from '@/components/shared/ui/title'
import { Button } from '@mui/material'
import { HiMiniUser } from 'react-icons/hi2'
import { IoIosArrowForward } from 'react-icons/io'
import { MdOutlineAirplaneTicket } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '@/components/shared/lib/store'
import { logout, selectUser } from '@/components/entities/user'

import { useTranslation } from 'next-i18next'
import { OptionMenuContext } from '@/components/shared/ui/optionMenuProvider/ui'
import clsx from 'clsx'

export const Menu = () => {
  const user = useAppSelector(selectUser)
  const useDispatch = useAppDispatch()
  const { setOption, option } = useContext(OptionMenuContext);
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
          <div onClick={()=>setOption(1)}  className={clsx(styles.navItem,{ [styles.active]:option === 1 })}>
            <div className={styles.navItem__icon}>
              <HiMiniUser />
            </div>
            <div className={styles.navItem__text}>{t(`profile.account`)}</div>
            <div className={styles.navItem__arrow}>
              <IoIosArrowForward />
            </div>
          </div>
          <div onClick={()=>setOption(2)} className={clsx(styles.navItem,{ [styles.active]:option === 2 })}>
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
