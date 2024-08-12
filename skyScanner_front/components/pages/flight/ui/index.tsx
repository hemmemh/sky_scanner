import React from 'react'
import { MainLayout } from '@/components/app/layouts/mainLayout'
import { Top } from './top'
import { Details } from './details'

export const Flight = () => {
  return (

    <MainLayout>
      <Top/>
      <Details/>
    </MainLayout>


  )
}
