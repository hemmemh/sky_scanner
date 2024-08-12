
import { FlightsFilter } from '@/components/features/flightsFilter'
import React from 'react'
import { FlightsBody } from './flightsBody'
import styles from './styles.module.scss';
import { Ad } from './ad';
export const Main = () => {
  return (
    <div className={styles.main}>
      <div className='container'>
        <div className={styles.body}>
        <FlightsFilter/>
          <FlightsBody/>
          <Ad/>
        </div>

      </div>
    </div>

  )
}
