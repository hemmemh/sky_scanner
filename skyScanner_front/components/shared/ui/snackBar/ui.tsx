'use client'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import styles from './styles.module.scss';
import clsx from 'clsx';
import { Snackbar, SnackbarCloseReason, SnackbarOrigin } from '@mui/material';

interface State extends SnackbarOrigin {
  open: boolean;
  message:string;
  onChange:(bool:boolean)=>void
}

export const MySnackBar:FC<State> = ({open, vertical, horizontal, message, onChange}) => {
  const [openBar, setOpenBar] = useState(open)

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    onChange(false)
    if (reason === 'clickaway') {
      return;
    }

    setOpenBar(false);
  };
  
  useEffect(() => {
   setOpenBar(open)
  }, [open])
  

  return (
        <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openBar}
        autoHideDuration={1000}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
      />
  )
}
