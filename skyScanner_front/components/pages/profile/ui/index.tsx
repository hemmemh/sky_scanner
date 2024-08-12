
import React  from 'react'
import styles from './styles.module.scss';

import { MainLayout } from '@/components/app/layouts/mainLayout';
import { Menu } from './menu';
import { Options } from './options';
import { OptionMenuProvider } from '@/components/shared/ui/optionMenuProvider';

export const Profile = () => {


  return (
    <MainLayout>
      <OptionMenuProvider>
      <div className='container'>
      <div className={styles.body}>
        <Menu/>
        <div className={styles.info}>
          <Options/>
        </div>
        </div>
      </div>
      </OptionMenuProvider>


      </MainLayout>

    
  )
}

 