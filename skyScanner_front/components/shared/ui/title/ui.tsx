import React, { FC, ReactNode } from 'react'
import styles from './styles.module.scss';
import clsx from 'clsx';

interface Title {

    children: ReactNode;
    className?:string
    size?:Size
    marginBottom?:string
    color?:string
}

type Size = 'text'| 'small' | 'medium' | 'large' | 'xl'
export const Title:FC<Title> = ({children, size = 'small', marginBottom= '0', className= 'default', color= 'white'}) => {
  return (
    <div style={{marginBottom,color}} className={clsx(className, styles.title,   styles[size])}>{children}</div>
  )
}
