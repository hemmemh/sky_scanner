'use client'
import React, { FC,useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss';
import clsx from 'clsx';
import { Input } from '../input';
import { FormControl,  MenuItem,  Select, SelectChangeEvent } from '@mui/material';
import { Title } from '../title';
import { NumberInput } from '../numberInput';
import { useAppDispatch, useAppSelector } from '../../lib/store';
import { fetchSeatClassList, selectSeatClassList } from '@/components/entities/seatClassList';
import { ISeatClass } from '../../api/seatClass';
import { SeatClassKeys } from '../../api/seatClass/types';
import { useTranslation } from 'react-i18next';

interface ISeatPicker {

  className?:string;
  label:string;
  placeholder:string
  onChange:({ seatNumber,seatClass }:{seatNumber:number, seatClass:string })=>void
}

export const SeatPicker:FC<ISeatPicker> = ({ className, label, placeholder, onChange }) => {
  const { t } = useTranslation();
  const lang  = t('city.lang') as SeatClassKeys
  const [popperOpen, setPopperOpen] = useState(false)
  const [input, setInput] = useState('')
  const [seatClass, setSeatClass] = useState<ISeatClass | null>(null)
  const useDispatch = useAppDispatch()
  useEffect(() => {
    useDispatch(fetchSeatClassList())
  }, [])

  const seatClassList = useAppSelector(selectSeatClassList)

  const [seatNumber, setSeatNumber] = useState(1)
  const autocompleteRef = useRef(null)
  const popperRef = useRef(null)

  useEffect(() => {

    document.addEventListener('click',setPopper)

    return () => {

      document.removeEventListener('click',setPopper)
    }
  }, [])

  useEffect(() => {
    if (!seatClass)  return
    console.log('d', seatClass);

    onChange({ seatNumber, seatClass:seatClass.uid })
    setInput(`${seatNumber} место, ${seatClass.name[lang]}`)
  }, [seatClass, seatNumber])

  useEffect(() => {
    if (seatClassList.length > 0) {
      setSeatClass(seatClassList[0])
    }

  }, [seatClassList])

  const setPopper = (e:any)=>{
    if (!popperRef.current)  return
    if (!autocompleteRef.current)  return
    const target = e.target as HTMLElement

    console.log('target', target);

    const popper = popperRef.current as HTMLElement
    const autocomplete = autocompleteRef.current as HTMLElement

    if (target.tagName === 'BODY')  return
    if (target.classList.contains('MuiMenuItem-root')) return
    if (target.classList.contains('MuiBackdrop-root')) return
    if (popper.contains(target) ) {
      return
    }

    if (autocomplete?.contains(target)){
      setPopperOpen(true)
      return
    }

    setPopperOpen(false)
  }

  const changeSeatClass = (event: SelectChangeEvent) => {

    const item = seatClassList.find(el=>el.name[lang] === event.target.value as string)
    if (item) {
      setSeatClass(item);
    }

  };

  const handleOpen = ()=>{
    setPopperOpen(true)
  }

  return (
    <div ref={autocompleteRef} onClick={handleOpen} className={clsx(styles.case, className, { [styles.active]:popperOpen })} >
      <div className={styles.case__body}>
        <div className={styles.case__upText}>{label}</div>
        <div >
          <Input readOnly placeholder={placeholder}   value={input}/>
          <div ref={popperRef}  className={clsx(styles.popper, { [styles.visible]:popperOpen })}>
            <div className={clsx(styles.popper__body)}>
              <Title size='small' color='black'>Класс</Title>
              {seatClass &&
                        <FormControl fullWidth>
                          <Select
                            value={seatClass.name[lang]}
                            onClick={(e)=>e.preventDefault}
                            onChange={changeSeatClass}
                            defaultValue='dd'
                          >
                            {seatClassList.map(el=><MenuItem key={el.uid} value={el.name[lang]}>{el.name[lang]}</MenuItem>)}
                          </Select>
                        </FormControl>}

              <div className={styles.seats}>
                <Title marginBottom='10px' color='black'>Места</Title>
                <NumberInput min={1} max={8} value={seatNumber} setValue={setSeatNumber}/>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

