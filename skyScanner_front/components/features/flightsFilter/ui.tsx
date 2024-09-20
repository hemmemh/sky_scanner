"use client";
import { Title } from "@/components/shared/ui/title";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React, { memo } from "react";
import { IoIosArrowDown } from "react-icons/io";
import styles from "./styles.module.scss";

import { useAppSelector } from "@/components/shared/lib/store";

import { selectTripList } from "@/components/entities/TripList/model/selectors";
import { useTranslation } from "next-i18next";
import { DepartureTimeFiltr } from "./ui/departureTimeFiltr";
import { TimeFiltr } from "./ui/timeFiltr";
import { StopsFiltr } from "./ui/stopsFiltr";

const accordionStyle = {
  boxShadow: "none",
  ".MuiAccordionSummary-root": { padding: "0 !important" },
};

export const FlightsFilter = memo(() => {
  const trips = useAppSelector(selectTripList);
  const { t } = useTranslation();

  return (
    <div className={styles.main}>
      <Accordion defaultExpanded sx={accordionStyle}>
        <AccordionSummary
          expandIcon={<IoIosArrowDown />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Title className={styles.titleAccordion} size="small">
            {" "}
            {t("tripFilter.departrureTimes")}
          </Title>
        </AccordionSummary>
        <AccordionDetails>{trips && <DepartureTimeFiltr />}</AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded sx={accordionStyle}>
        <AccordionSummary
          expandIcon={<IoIosArrowDown />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Title className={styles.titleAccordion} size="small">
            {t("tripFilter.journeyDuration")}
          </Title>
        </AccordionSummary>
        <AccordionDetails>{trips && <TimeFiltr />}</AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded sx={accordionStyle}>
        <AccordionSummary
          expandIcon={<IoIosArrowDown />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Title className={styles.titleAccordion} size="small">
            {t("tripFilter.numberOfTransfers")}
          </Title>
        </AccordionSummary>
        <AccordionDetails>{trips && <StopsFiltr />}</AccordionDetails>
      </Accordion>
    </div>
  );
});
