"use client";
import React, { FC } from "react";
import styles from "./styles.module.scss";

import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { FlightData } from "@/components/shared/ui/flightData";
import { FlightVertData } from "@/components/shared/ui/flightVertData";
import { IoIosArrowDown } from "react-icons/io";
import { ITrip } from "@/components/shared/api/trip";

import {
  msToHoursAndMinutes,
  weekDayAndDatefromMs,
} from "@/components/shared/lib/flight";
import { useTranslation } from "next-i18next";

import Image from "next/image";

interface IFlightBigCard {
  data: ITrip[];
}

export const FlightBigCard: FC<IFlightBigCard> = ({ data }) => {
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
                <div className={styles.info__company}>
                  <Image
                    alt="image"
                    width={100}
                    className={styles.image}
                    height={100}
                    src={`${process.env.NEXT_PUBLIC_API_STATIC_URL}companies/${data[0].company.image}`}
                    unoptimized
                  />
                </div>
                <FlightData data={data} />
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className={styles.trips}>
              {data.map((el) => (
                <>
                  <div key={el.uid} className={styles.bort}>
                    {el.airBus.name}
                  </div>
                  <FlightVertData trip={el} />
                  <div className={styles.infos}>
                    <div className={styles.info}>
                      {t("tripData.arrives")}{" "}
                      {weekDayAndDatefromMs(+el.departure_time, t("city.lang"))}
                    </div>
                    <span className={styles.span}></span>
                    <div className={styles.info}>
                      {t("tripData.journeyDuration")}{" "}
                      {
                        msToHoursAndMinutes(
                          +el.departure_time,
                          +el.arrival_time,
                        ).hours
                      }
                      {t("tripData.hours")}{" "}
                      {
                        msToHoursAndMinutes(
                          +el.departure_time,
                          +el.arrival_time,
                        ).minutes
                      }
                    </div>
                  </div>
                </>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};
