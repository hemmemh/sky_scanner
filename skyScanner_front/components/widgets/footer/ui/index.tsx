'use client'
import React, { memo, useState } from 'react'
import styles from './styles.module.scss';
import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material';
import Link from 'next/link';
import { IoIosArrowDown } from 'react-icons/io';
import { Title } from '@/components/shared/ui/title';
import { useTranslation } from 'react-i18next';
import { footerLng } from '@/components/shared/i18n/footer';
import { LanguageChange } from '@/components/features/languageChange';



const accordionStyle = {
  boxShadow:'none',
   background:'none',
  '.MuiAccordionSummary-root':{margin:'0 !important', padding:'0', minHeight:'24px !important'},
  '.MuiAccordionSummary-content':{margin:'0 !important', padding:'0'}}


export const Footer = memo(() => {

  const { t } = useTranslation();
  const [openLanguage, setOpenLanguage] = useState(false)

  const languageButton = ()=>{

    setOpenLanguage(true)
   }

  return (
    <div className={styles.main}>
      <div className='container'>
        <div className={styles.body}>
          <div className={styles.top}>
             <div className={styles.language}>
            <Button  onClick={languageButton}  sx={{width:'100%'}} variant="contained">  {t('footer.button')}</Button>
             </div>
             <div className={styles.action_colums}>
            <div className={styles.action_column}>
              <Link className={styles.action} href={''}><div >{t('footer.part1')}</div></Link>
              <Link className={styles.action} href={''}><div >{t('footer.part2')}</div></Link>
              <Link className={styles.action} href={''}><div >{t('footer.part3')}</div></Link>
            </div>
            <div className={styles.action_column}>
              <Link href={''}><div className={styles.action}>{t('footer.part4')}</div></Link>
              <Link href={''}><div className={styles.action}>{t('footer.part5')}</div></Link>
              <Link href={''}><div className={styles.action}>{t('footer.part6')}</div></Link>
            </div>

         
 
            <div className={styles.action_column}>
              {   Object.keys(footerLng.ru).slice(7,11).map((el, i)=>
                            <Accordion sx={accordionStyle} key={el}>
                            <AccordionSummary
                              expandIcon={<IoIosArrowDown   color='white'/>}
                              aria-controls="panel1-content"
                              id="panel1-header"
                            >
                              <Title size='small' className={styles.titleAccordion}>    {t(`footer.${el}`)}</Title>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className={styles.accordion_list}>
                                <Link className={styles.action} href={''} key={el}>
                                {t(`footer.${Object.keys(footerLng.ru)[i + 12]}`)}
                                </Link>
                                </div>
                            </AccordionDetails>
                                </Accordion>
              ) }

            </div>
             </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.text_bottom}>{t('footer.part27')}</div>
            <div className={styles.title_bottom}>© Skyscanner Ltd 2002–2024</div>
          </div>
        </div>
      </div>

      <LanguageChange value={openLanguage} onChange={setOpenLanguage}/>
    </div>
  )
})
