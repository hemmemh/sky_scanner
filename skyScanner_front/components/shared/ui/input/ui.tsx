'use client'
import React, { InputHTMLAttributes, forwardRef } from 'react'
import styles from './styles.module.scss';

interface IInput extends InputHTMLAttributes<HTMLInputElement>  {

}

export const Input = forwardRef<HTMLInputElement,IInput>(({ ...props }, ref) => {
  return (

    <input  {...props} className={styles.input}  type="text" ref={ref}  />

  )
})
