'use client'
import React  from 'react'
import styles from './styles.module.scss';

import { MainLayout } from '@/components/app/layouts/mainLayout';

import { useAppDispatch, useAppSelector } from '@/components/shared/lib/store';
import { deleteLovesAction, selectUser } from '@/components/entities/user';
import { FlightData } from '@/components/shared/ui/flightData';
import { IconButton } from '@mui/material';
import { MdFavorite } from 'react-icons/md';
import { isTripsPairs } from '@/components/shared/quards/guards';
import { ILoves } from '@/components/shared/api/loves';
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

 