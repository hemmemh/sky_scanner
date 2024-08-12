'use client'
import React, { Children, FC, InputHTMLAttributes, MouseEventHandler, ReactEventHandler, ReactNode, Ref, RefAttributes, forwardRef, memo, useCallback, useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss';
import clsx from 'clsx';
import { Input } from '../input';
import { renderToStaticMarkup } from 'react-dom/server';
import { BiSolidPlaneAlt } from 'react-icons/bi';


interface Autocomplete {

  isValid:boolean,
  items:string[]
  className?:string;
  label:string;
  placeholder:string
  onChange:(value:string)=>void
}

export const Autocomplete:FC<Autocomplete> = memo(({className = 'default', label, onChange, placeholder = '', items, isValid = false}) => {

  const [input, setInput] = useState('')
  const [values, setValues] = useState<string[]>(items)
  const [filrerValues, setFilterValues] = useState<string[]>(values)
  const [popperOpen, setPopperOpen] = useState(false)
  const autocompleteRef = useRef(null)
  const popperRef = useRef(null)

  const valueClick = (event:string)=>{

    setInput(event)
    onChange(event)
  }


  

  const filterPopper = (value:string)=>{
  
    setInput(value)
  
    
   
      if (value === '') {
        return setFilterValues(values)
      }
  
      setFilterValues(values.filter(el=>{
        const innerText =  renderToStaticMarkup(el)
        return innerText.toLowerCase().includes(value.toLowerCase())
      }))
  
  }

  useEffect(() => {
  
    document.addEventListener('click',setPopper)
 
   return () => {
  
     document.removeEventListener('click',setPopper)
   }
 }, [])


 useEffect(() => {
  setValues(items)
  setFilterValues(items)
 }, [items])
 



  const setPopper = useCallback((e:any)=>{
    if (!popperRef.current)  return
    if (!autocompleteRef.current)  return
    const target = e.target as HTMLElement
   
    
    const popper = popperRef.current as HTMLElement
    const autocomplete = autocompleteRef.current as HTMLElement
    if (popper.contains(target) ) {
      return
  }
  
  if(autocomplete?.contains(target)){
    setPopperOpen(true)
    return
  }
  

  
  setPopperOpen(false)
   
  
  }, [popperRef, autocompleteRef ])


  return (
    <div ref={autocompleteRef} className={clsx(styles.case, className, {[styles.active]:popperOpen}, {[styles.inValid]:!isValid})} >
    <div className={styles.case__body}>
    <div className={styles.case__upText}>{label}</div>
          <div >
                     <Input placeholder={placeholder}  onChange={e=>filterPopper(e.target.value)}  value={input}/>
                     <div ref={popperRef} className={clsx(styles.popper, {[styles.visible]:popperOpen})}>
                      <div className={clsx(styles.popper__body)}>
                      {filrerValues.length === 0 && <div> нет значений</div>}
                       {filrerValues.map((el, id)=>
                         <div className={clsx(styles.popper__item, {[styles.activeItem]:el === input})} onClick={(e)=>valueClick(el)} key={id}>
                                     
                                           <BiSolidPlaneAlt/>
                                           <div className={styles.popper__text}>{el}</div>
                                       
                         </div>
                       )}
                      </div>
                     </div>
          </div> 
    </div>
  
    </div>
  )
})
