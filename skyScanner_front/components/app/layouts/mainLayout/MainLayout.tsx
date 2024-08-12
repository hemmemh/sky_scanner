'use client'
import { Footer } from '@/components/widgets/footer'
import { Header } from '@/components/widgets/header'
import React, { useEffect } from 'react'
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '@/components/shared/lib/store';
import { selectTrips } from '@/components/entities/Trip';
import { verifyUser } from '@/components/entities/user';
export const MainLayout = ({children}:{children:React.ReactNode}) => {


  const useDispatch = useAppDispatch()
  const trips = useAppSelector(selectTrips)
  
  useEffect(() => {
    useDispatch(verifyUser())
  }, [])

  return (
    <div className={styles.MainLayout}>
    <Header/>
    <div className={styles.children}>{children}</div>

    <Footer/>
    </div>
  )
}
