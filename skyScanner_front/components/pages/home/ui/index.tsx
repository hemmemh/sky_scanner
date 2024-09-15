import React from 'react'
import { ChooseRoute } from './chooseRoute';
import { Destination } from './destination';
import { Info } from './info';
import { MainLayout } from '@/components/app/layouts/mainLayout';

export const Home = () => {

  return (
    <MainLayout>
      <ChooseRoute/>
      <Destination/>
      <Info/>
    </MainLayout>

  )
}
