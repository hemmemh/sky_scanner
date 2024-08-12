'use client'
import React, { FC, InputHTMLAttributes, ReactNode, Ref, RefAttributes, forwardRef } from 'react'
import styles from './styles.module.scss';
import clsx from 'clsx';

interface Input extends InputHTMLAttributes<HTMLInputElement>  {


}


export const Input = forwardRef<HTMLInputElement,Input>(({...props}, ref) => {
  return (

        <input  {...props} className={styles.input}  type="text" ref={ref}  />
    
   


  )
})
