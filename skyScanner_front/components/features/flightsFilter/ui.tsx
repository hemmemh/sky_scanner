"use client"
import { Title } from '@/components/shared/ui/title'
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, Slider, Typography } from '@mui/material'
import React, { memo, SyntheticEvent, useEffect, useRef, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import styles from './styles.module.scss';

import { useAppDispatch, useAppSelector } from '@/components/shared/lib/store'

import { getHoursAndMinutes, getHoursFromMs } from '@/components/shared/lib/flight/day'
import { selectMaxDepartureTime,  selectTripList } from '@/components/entities/TripList/model/selectors'
import { useTranslation } from 'react-i18next'
import { DepartureTimeFiltr } from './ui/departureTimeFiltr'
import { TimeFiltr } from './ui/timeFiltr'
import { StopsFiltr } from './ui/stopsFiltr'



const accordionStyle = {
    boxShadow:'none',
     '.MuiAccordionSummary-root':{padding:'0 !important'}}


export const FlightsFilter = memo(() => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const trips = useAppSelector(selectTripList)
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const { t } = useTranslation();

    const [value, setValue] = useState<number[]>([20, 37]);
    const [checked, setChecked] = React.useState(false);


  return (
     <div className={styles.main}>

                            <Accordion defaultExpanded sx={accordionStyle}>
                            <AccordionSummary
                              expandIcon={<IoIosArrowDown />}
                              aria-controls="panel1-content"
                              id="panel1-header"
                            >
                              <Title className={styles.titleAccordion} size='small'> {t('tripFilter.departrureTimes')}</Title>
                            </AccordionSummary>
                            <AccordionDetails>
                                {trips && <DepartureTimeFiltr/>}
                            </AccordionDetails>
                            </Accordion>
                            <Accordion defaultExpanded sx={accordionStyle}>
                            <AccordionSummary
                              expandIcon={<IoIosArrowDown />}
                              aria-controls="panel1-content"
                              id="panel1-header"
                            >
                              <Title className={styles.titleAccordion} size='small'>{t('tripFilter.journeyDuration')}</Title>
                            </AccordionSummary>
                            <AccordionDetails>
                              {trips && <TimeFiltr/>}
                            </AccordionDetails>
                            </Accordion>
                            <Accordion defaultExpanded sx={accordionStyle}>
                            <AccordionSummary
                              expandIcon={<IoIosArrowDown />}
                              aria-controls="panel1-content"
                              id="panel1-header"
                            >
                              <Title className={styles.titleAccordion} size='small'>{t('tripFilter.numberOfTransfers')}</Title>
                            </AccordionSummary>
                            <AccordionDetails>
                               {trips && <StopsFiltr/>}
                            </AccordionDetails>
                            </Accordion>
                            </div>
  )
})
