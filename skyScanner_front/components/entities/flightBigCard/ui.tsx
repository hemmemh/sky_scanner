'use client'
import React, { FC } from 'react'
import styles from './styles.module.scss';
import clsx from 'clsx';
import { IoAirplaneSharp } from "react-icons/io5";
import { Accordion, AccordionDetails, AccordionSummary, Button, IconButton } from '@mui/material';
import { FaArrowRightLong } from "react-icons/fa6";

import { MdFavoriteBorder } from "react-icons/md";
import { FlightData } from '@/components/shared/ui/flightData';
import { FlightVertData } from '@/components/shared/ui/flightVertData';
import { IoIosArrowDown } from 'react-icons/io';
import { ITrip } from '@/components/shared/api/trip';
import { isTripsPairs } from '@/components/shared/quards/guards';
import dayjs from "dayjs"
import { msToHoursAndMinutes, weekDayAndDatefromMs } from '@/components/shared/lib/flight';
import { useTranslation } from 'react-i18next';



interface FlightBigCard {
  data:ITrip[]
}






export const FlightBigCard:FC<FlightBigCard> = ({data}) => {

  const { t } = useTranslation();




  
  return (
     <div className={styles.main}>
      <div className={styles.body}>
      <Accordion>
        <AccordionSummary
          expandIcon={<IoIosArrowDown />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className={styles.head}>
          <div className={styles.info}>
         
      <div className={styles.info__company}>{data[0].company.name}</div>
      <FlightData data={data}/>
       </div> 
          </div>

        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.trips}>
            {data.map(el=>
              <>
                  <div key={el.uid} className={styles.bort}>{el.airBus.name}</div>
          <FlightVertData trip={el}/>
          <div className={styles.infos}>
          <div className={styles.info}>{t('tripData.arrives')} {weekDayAndDatefromMs(+el.departure_time)}</div>
          <span className={styles.span}></span>
          <div className={styles.info}>{t('tripData.journeyDuration')} {msToHoursAndMinutes(+el.departure_time, +el.arrival_time).hours}{t('tripData.hours')} {msToHoursAndMinutes(+el.departure_time, +el.arrival_time).minutes}</div>
          </div></>
            )}
          </div>

        </AccordionDetails>
      </Accordion>
      </div>
     </div>
  )
}
