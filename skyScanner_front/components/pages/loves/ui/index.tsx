'use client'
import React  from 'react'
import styles from './styles.module.scss';

import { MainLayout } from '@/components/app/layouts/mainLayout';

import {  useAppSelector } from '@/components/shared/lib/store';
import { selectUser } from '@/components/entities/user';

import { Title } from '@/components/shared/ui/title';
import { FlightLovesCard } from '@/components/entities/flightLovesCard';

export const Loves = () => {

  const user = useAppSelector(selectUser)

  return (
    <MainLayout>
      <div className={styles.main}>
        <div className='container'>

          <div className={styles.body}>
            <Title color='#000' size='large'>Закладки</Title>
            <div className={styles.items}>
              {user?.loves.map(loves=>
                <FlightLovesCard key={loves.uid} loves={loves}/>
              )}
            </div>

          </div>
        </div>
      </div>
    </MainLayout>

  )
}
