'use client'
import  { useEffect, useRef, useState } from 'react'
import { ISeatClass } from '../../api/seatClass'
import { useAppDispatch, useAppSelector } from '../store'
import { Info, InfoValidation, panelInputLabel } from '../../types/tripsTypes'
import dayjs, { Dayjs } from 'dayjs'
import { ICity } from '../../api/city'
import { fetchCityList, selectCityList } from '@/components/entities/cityList'
import { fetchSeatClassList } from '@/components/entities/seatClassList'
import { CityKeys } from '../../api/city/types'
import { useTranslation } from 'next-i18next'

const infoDefault:Info = {
  from:'',
  to:'',
  seatNumber:1,
  seatClass: '',
  sort: 'optimal'
}

const validationDefault:InfoValidation = {
  from:true,
  to:true,
  depart:true,
  seatNumber:true,
  seatClass:true,

}

export const UseRoutePanel = () => {

  const useDispatch = useAppDispatch()
  const [info, setInfo] = useState<Info>(infoDefault)
  const validation = useRef<InfoValidation>(validationDefault)
  const [validationState, setValidationState] = useState<InfoValidation>(validationDefault)
  const [depart, setDepart] = useState<number| null>(dayjs().valueOf())
  const [returnState, setReturnState] = useState<number| null>(null)
  const [fromCityList, setFromCityList] = useState<ICity[]>([])
  const [toCityList, setToCityList] = useState<ICity[]>([])
  const cityList = useAppSelector(selectCityList)
  const { t } = useTranslation();
  useEffect(() => {
    useDispatch(fetchCityList())
    useDispatch(fetchSeatClassList())
  }, [])

  useEffect(() => {
    setFromCityList(cityList)
    setToCityList(cityList)
  }, [cityList])

  const onInfoChange = (type:panelInputLabel, value:string | number | ISeatClass)=>{
    setInfo(prev=>({ ...prev, [type]:value }))
  }

  const onSeatChange = (seatNumber:number, seatClass:string)=>{
    console.log('seatClass', seatClass);

    onInfoChange('seatNumber',seatNumber)
    onInfoChange('seatClass',seatClass)

  }

  const onCityFromChange = (name:string)=>{
    const item = cityList.find(el=>{
      const lang  = t('city.lang') as CityKeys
      return el.name[lang] === name

    })
    if (!item) return
    setInfo({ ...info, from:item.uid })
    const newToCityList = cityList.filter(el=>el.uid !== item.uid)
    setToCityList(newToCityList)
    setValidationState({ ...validationState, from:true })

  }

  const onCityToChange = (name:string)=>{
    const item = cityList.find(el=>{
      const lang  = t('city.lang') as CityKeys
      return el.name[lang] === name
    })
    if (!item) return
    setInfo({ ...info, to:item.uid })
    const newFromCityList = cityList.filter(el=>el.uid !== item.uid)
    setFromCityList(newFromCityList)
    setValidationState({ ...validationState, to:true })
  }

  const onDepartChange = (e:Dayjs| null)=>{
    setDepart(e?.utc(true).valueOf() ?? null)
    setValidationState({ ...validationState, depart:true })
  }

  const onReturnChange = (e:Dayjs| null)=>{
    setReturnState(e?.utc(true).valueOf() ?? null)
  }

  const checkValidation = (info:Info, depart:number| null) => {
    validation.current = {
      from: info.from !== '',
      to:info.to !== '',
      depart:depart !== null,
      seatClass : info.seatClass !== '',
      seatNumber: true
    }

    setValidationState(validation.current)

  }

  return {
    depart,
    info,
    setDepart,
    returnState,
    setReturnState,
    fromCityList,
    toCityList,
    validation,
    onSeatChange,
    onCityFromChange,
    onCityToChange,
    onDepartChange,
    onReturnChange,
    checkValidation,
    validationState, }
}
