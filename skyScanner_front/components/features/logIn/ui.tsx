"use client"
import React, { FC, useEffect } from 'react'
import styles from './styles.module.scss';
import { Button, FormControl, IconButton, Input, MenuItem, Modal, Select, SelectChangeEvent, Snackbar } from '@mui/material';
import Image from 'next/image';
import logo from '@/public/logo-blue.svg'
import { Title } from '@/components/shared/ui/title';
import { IoMdClose } from 'react-icons/io';
import { login, registration } from '@/components/shared/api/user';
import { MySnackBar } from '@/components/shared/ui/snackBar/ui';
import { useAppDispatch } from '@/components/shared/lib/store';
import { setPofile } from '@/components/entities/user';


const closeStyle={
  position:'absolute',
   top:'10px',
   right:'10px'
}

interface LogIn {
  onChange:(bool:boolean)=>void
  value:boolean
}

export const LogIn:FC<LogIn> = ({onChange, value}) => {
  const useDispatch = useAppDispatch()
  const [open, setOpen] = React.useState(value);
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');


  useEffect(() => {
    
    setOpen(value)
   
  }, [value])
  

  const handleClose = () => {
    setOpen(false);
    onChange(false)
  };

  const onRegistrationClick = ()=>{
    registration({email, password}).then(data=>{
      setSnackBarMessage('Успешная регистрация')
      setSnackBarOpen(true)
      setPassword('')
      setEmail('')
    }).catch(data=>{
      console.log('dd', data);
      const message = data.response.data.message
      if(Array.isArray(message)){
        setSnackBarMessage(data.response.data.message[0])
      }else{
        setSnackBarMessage(data.response.data.message)
      }
     
      setSnackBarOpen(true)
    })
  }

  const onloginClick = ()=>{
    login({email, password}).then(data=>{
      localStorage.setItem('access_token', data.access_token) 
      useDispatch(setPofile(data.user))
      setSnackBarMessage('Успешная авторизация')
      setSnackBarOpen(true)
      setPassword('')
      setEmail('')
      onChange(false)

    }).catch(data=>{
      console.log('dd', data);
      const message = data.response.data.message
      if(Array.isArray(message)){
        setSnackBarMessage(data.response.data.message[0])
      }else{
        setSnackBarMessage(data.response.data.message)
      }
     
      setSnackBarOpen(true)
    })
  }

  return (
    <>
        <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="child-modal-title"
    aria-describedby="child-modal-description"
  >
    <div className={styles.body}>
      <div className={styles.logo}>
        <Image  src={logo} alt='logo'/>
      </div>
      <Title className={styles.titleColor} size='large'>Get the full experience</Title>
      <div className={styles.text}>Track prices, make trip planning easier and enjoy faster booking.</div>
      <div className={styles.action}>
        <Input value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder='email'/>
        <Input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='пароль  '/>
      </div>
      <div className={styles.button}>
        <Button onClick={onloginClick}  variant="contained"  sx={{width:'100%'}}>Войти</Button>
      </div>
      <div className={styles.button}>
        <Button onClick={onRegistrationClick}  variant="contained"  sx={{width:'100%', marginTop:'10px'}}>Регистрация</Button>
      </div>
  
      <IconButton onClick={handleClose} sx={closeStyle}><IoMdClose /></IconButton>
  
    </div>

  </Modal>
        <MySnackBar onChange={(e)=>setSnackBarOpen(e)} open={snackBarOpen} vertical='bottom' horizontal='center' message={snackBarMessage}/>
    </>


  )
}


