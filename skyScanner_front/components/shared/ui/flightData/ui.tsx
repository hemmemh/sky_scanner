"use client";
import React, { FC, memo, useMemo } from "react";
import styles from "./styles.module.scss";
import { IoAirplaneSharp } from "react-icons/io5";
import { ITrip } from "../../api/trip";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);
import { msToHoursAndMinutes, sliceCity } from "../../lib/flight";
import { useTranslation } from "next-i18next";
import { CityKeys } from "../../api/city/types";
interface IFlightData {
  data: ITrip[];
}

export const FlightData: FC<IFlightData> = memo(({ data }) => {
  const { t } = useTranslation();
  console.log("data", data);

  const { start, end, hours, minutes } = useMemo(
    () =>
      msToHoursAndMinutes(
        +data[0].departure_time,
        +data[data.length - 1].arrival_time,
      ),
    [data],
  );

  const cityLang = t("city.lang") as CityKeys;

  return (
    <div className={styles.dataFlight}>
      <div className={styles.dataFlight__location}>
        <div className={styles.dataFlight__time}>{start}</div>
        <div className={styles.dataFlight__place}>
          {sliceCity(data[0].departure_city.name[cityLang])}
        </div>
      </div>
      <div className={styles.dataFlight__direction}>
        <div className={styles.dataFlight__hours}>
          {hours}
          {t("tripData.hours")}
          {minutes}
        </div>
        {data.length > 1 && (
          <div className={styles.dataFlight__hours}>{data.length}</div>
        )}

        <div className={styles.dataFlight__icon}>
          <span></span>
          <IoAirplaneSharp color="#626971" />
        </div>
        {
          <div className={styles.dataFlight__direct}>
            {data.length === 1 ? t("tripData.direct") : t("tripData.transfers")}
          </div>
        }
      </div>
      <div className={styles.dataFlight__location}>
        <div className={styles.dataFlight__time}>{end}</div>
        <div className={styles.dataFlight__place}>
          {sliceCity(data[data.length - 1].arrival_city.name[cityLang])}
        </div>
      </div>
    </div>
  );
});
