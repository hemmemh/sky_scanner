'use client'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss';
import { Title } from '@/components/shared/ui/title';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { IoIosArrowDown } from "react-icons/io";
import { infoLng } from '@/components/shared/i18n/home';
import { useTranslation } from 'react-i18next';



const accordionStyle = {
  boxShadow:'none',
   '.MuiAccordionSummary-root':{padding:'0 !important'}}
export const Info = () => {
  const { t } = useTranslation();
  


  return (
    <div className={styles.main}>
      <div className='container'>
        <div className={styles.body}>
          <Title size='medium' className={styles.titleAccordion}>{t(`infoHome.part0`)}</Title>
          <div className={styles.content}>
            <div className={styles.accordionContent}>
              {Object.keys(infoLng.ru).slice(1,6).map((el, i)=>
                            <Accordion sx={accordionStyle}  key={el}>
                            <AccordionSummary
                              expandIcon={<IoIosArrowDown />}
                              aria-controls="panel1-content"
                              id="panel1-header"
                            >
                              <Title size='small' className={styles.titleAccordion}>{t(`infoHome.${el}`)}</Title>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className={styles.text}>
                                 {t(`infoHome.${Object.keys(infoLng.ru)[i + 11]}`)}
                                </div>
                            </AccordionDetails>
                                </Accordion>
              )}

            </div>
            <div className={styles.accordionContent}>
            {Object.keys(infoLng.ru).slice(6,11).map((el, i)=>
                            <Accordion sx={accordionStyle} key={el}>
                            <AccordionSummary
                              expandIcon={<IoIosArrowDown />}
                              aria-controls="panel1-content"
                              id="panel1-header"
                            >
                              <Title size='small' className={styles.titleAccordion}>{t(`infoHome.${el}`)}</Title>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className={styles.text}>
                                {t(`infoHome.${Object.keys(infoLng.ru)[i + 16]}`)}
                                </div>
                            </AccordionDetails>
                                </Accordion>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
