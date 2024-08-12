'use client'
import React from 'react'
import styles from './styles.module.scss';
import { Title } from '@/components/shared/ui/title';
import { IoIosArrowForward } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '@/components/shared/lib/store';
import { deleteUserAction } from '@/components/entities/user/model/userThunk';
import { selectUser } from '@/components/entities/user';
import { useTranslation } from 'react-i18next';
export const User = () => {
    const useDispatch = useAppDispatch()
    const user = useAppSelector(selectUser)
    const { t } = useTranslation();

    const deleteUser = ()=>{
        if (!user) return
        useDispatch(deleteUserAction(user))
    }
  return (
     <div className={styles.main}>
        <div className={styles.body}>
            <Title className={styles.titleColor} size='large'>{t(`profile.account`)}</Title>
            <div className={styles.name}>{t(`profile.generalInfo`)}</div>
            <div className={styles.mail}>
                <div className={styles.mail__top}>{t(`profile.email`)}</div>
                <div className={styles.mail__name}>{user?.email}</div>
            </div>
            <div className={styles.name}>{t(`profile.account`)}</div>
            <div onClick={deleteUser} className={styles.delete}>
                <div className={styles.delete__mame}>{t(`profile.deleteAccount`)}</div>
                <IoIosArrowForward />
            </div>
        </div>
     </div>
  )
}
