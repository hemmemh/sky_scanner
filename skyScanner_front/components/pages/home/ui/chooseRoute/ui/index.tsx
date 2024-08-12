'use client'
import React from 'react'
import styles from './styles.module.scss';
import { Title } from '@/components/shared/ui/title';
import { RoutePanel } from './routePanel';
import { useTranslation } from 'react-i18next';

export const ChooseRoute = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.chooseRoute}>
              <div className='container'>
           
                 <Title size='medium'>{t('chooseRoute.title')}</Title>
                 <RoutePanel/>
              </div>

    </div>
  )
}
