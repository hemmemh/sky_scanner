'use client'
import React from 'react'
import styles from './styles.module.scss';
import Image from 'next/image';
import mainImage from '@/public/images/shutterstock_1278417400.jpg';
import { Title } from '@/components/shared/ui/title';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const Destination = () => {

  const { t } = useTranslation();

  return (
     <div className={styles.main}>
      <div className='container'> 
        <div className={styles.body}>
        <div className={styles.info}>
      
      <Title marginBottom='5px'>{t('destination.part1')}</Title>
      <Title marginBottom='20px' size='xl'>{t('destination.part2')}</Title>
       <Button color='inherit' variant="contained">{t('destination.part3')}</Button>
    </div>
  <div className={styles.image_cover}>
              <Image
              src={mainImage}
              width={1000}
              height={1000}
              className={styles.image}
              alt="logo"
            />
  </div>
        </div>

      </div>

     </div>
  )
}
