'use client'
import React, { useContext, useState } from 'react'
import styles from './styles.module.scss';
import { User } from './user';
import { Booking } from './booking';
import { OptionMenuContext } from '@/components/shared/ui/optionMenuProvider/ui';



export const Options = () => {
  const { option } = useContext(OptionMenuContext);

  return (
   <div className={styles.main}>
    {option === 1 &&  <User/>}
    {option === 2 &&  <Booking/>}
  

   </div>

  

    
  )
}

 