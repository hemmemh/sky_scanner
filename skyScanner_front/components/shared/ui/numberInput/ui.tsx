'use client'
import React, { FC, InputHTMLAttributes, ReactNode, Ref, RefAttributes, forwardRef, useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss';
import clsx from 'clsx';


interface NumberInput {
  className?:string
  value:number
  setValue:(e:any)=>void
  placeholder?:string | undefined
  min?:number
  max?:number
}


export const NumberInput:FC<NumberInput> = ({className,value,setValue,placeholder='',min=0,max=100}) => {
  const [num, setNum] = useState(value)

  useEffect(() => {
    setNum(value)
  
  }, [value])

  const onPlus=(a:number)=>{
    const res = Math.min(max,a+1)
    change(res)
}
const onMinus=(a:number)=>{
    const res = Math.max(min,a-1)
    change(res)
}

  
    const change = (e:any)=>{
      let num = +e
  if (+e < min) {
    num = min
  }
  if (+e > max) {
    num = max
  }   
  setValue(num)
       }

       const keyDone = (e:any)=>{
         if (e.keyCode===13) {
          change(e.target.value)
         }
       }


  return (
    <div className={`${styles.MyNumber} ${className}`}>
      <div  onClick={()=>onMinus(value)} className={clsx(styles.Amount__change,{[styles.active]: num > min} , styles._minus)}></div>
      <input  type="number"  onBlur={(e)=>change(e.target.value)} onKeyDown={keyDone} onChange={(e:any)=>setNum(e.target.value)}  value={num} placeholder={placeholder}/>
      <div onClick={()=>onPlus(value)} className={clsx(styles.Amount__change,{ [styles.active]: num < max}, styles._plus)}></div>
   
    </div>
  )
}

