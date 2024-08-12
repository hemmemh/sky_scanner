'use client'
import React, { memo, useEffect, useState } from 'react'
import styles from './styles.module.scss';
import logo from "@/public/logo.svg";
import { MdLanguage } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import Image from 'next/image';
import { IconButton } from '@mui/material';
import { LogIn } from '@/components/features/logIn';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/components/shared/lib/store';
import { selectUser } from '@/components/entities/user';
import { LanguageChange } from '@/components/features/languageChange';
import { MySnackBar } from '@/components/shared/ui/snackBar/ui';
export const Header =memo( () => {

   const router =  useRouter()
   const [openLogIn, setOpenLogIn] = useState(false)
   const [openLanguage, setOpenLanguage] = useState(false)
   const [snackBarOpen, setSnackBarOpen] = useState(false)
   const [snackBarMessage, setSnackBarMessage] = useState('')
 
   const user = useAppSelector(selectUser)


   const loginButton = ()=>{
    console.log('user', user);
    
    if (user) {
      router.push('/profile')
    }else{
      setOpenLogIn(true)
    }
   }

   const languageButton = ()=>{

    setOpenLanguage(true)
   }

   const lovesButton = ()=>{
    if (!user) {
      setSnackBarMessage('не авторизован')
      setSnackBarOpen(true)
    }
    if (user) {
      router.push('/loves')
    }
   }
   
  
  return (
    <div className={styles.header}>
                  <div className='container'>
                  <div className={styles.body}>
            <div onClick={()=>router.push('/home')} className={styles.logo}>
            <Image
                  src={logo}
                  width={173}
                  height={40}
                  className={styles.logoIcon}
                  alt="logo"
                />
            </div>
            <div className={styles.actions}>
            <IconButton onClick={languageButton}  color='inherit'  aria-label="language">
            <MdLanguage color='white' fontSize={25}/>
            </IconButton>
            <IconButton onClick={lovesButton} color='inherit'   aria-label="language">
            <MdFavorite color='white' fontSize={25}/>
            </IconButton>
            <IconButton onClick={loginButton}  color='inherit'  aria-label="language">
            <FaUser color='white' fontSize={25}/>
            </IconButton>
         
 


            </div>
                  </div>
                  </div>
      <LogIn value={openLogIn} onChange={setOpenLogIn}/>
      <LanguageChange value={openLanguage} onChange={setOpenLanguage}/>
      <MySnackBar open={snackBarOpen} onChange={e=>setSnackBarOpen(e)} horizontal='center' vertical='bottom' message={snackBarMessage}/>
    </div>
  )
})
