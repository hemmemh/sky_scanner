"use client"
import React, { useState } from 'react'
import styles from './styles.module.scss';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Sort } from '@/components/shared/types/tripsTypes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/components/shared/lib/store';
import { selectAllTrips } from '@/components/entities/TripList';

const sortList:Sort[] = ['optimal', 'cheapest', 'fastest']


export const FlightsSort = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname()
  const [sort, setSort] = React.useState(sortList[0]);
  const alltrips = useAppSelector(selectAllTrips)
  const router = useRouter();
  const { t } = useTranslation();

  const handleChange = (event: SelectChangeEvent<Sort>) => {
    setSort(event.target.value as Sort);
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set('sort',event.target.value);
    router.replace(`${pathname}?${currentParams.toString()}`);
  };

  return (
    <div className={styles.main}>
      <div className={styles.result}>{alltrips} {t(`tripSort.results`)}</div>
      <div className={styles.select}>
      <div className={styles.select_label}>{t(`tripSort.sortby`)}</div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={sort}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {sortList.map(el=>   <MenuItem key={el} value={el}>  {t(`tripSort.${el}`)}</MenuItem>)}
       
        </Select>
      </FormControl>
      </div>

    </div>
  )
}
