import React, { useEffect } from 'react'
import styles from './styles.module.scss';
import { Header } from '@/components/widgets/header';
import { ChooseRoute } from './chooseRoute';
import { Destination } from './destination';
import { Info } from './info';
import { Footer } from '@/components/widgets/footer';
import { MainLayout } from '@/components/app/layouts/mainLayout';
import { getAllAirBus } from '@/components/shared/api/airbus/airbus';
import { useAppDispatch } from '@/components/shared/lib/store';
import { fetchAirBusList } from '@/components/entities/airBus';

export const Home = () => {

  
  return (
    <MainLayout>
          <ChooseRoute/>
           <Destination/>
           <Info/>
      </MainLayout>

    
  )
}

 