"use client";

import React, { memo, useEffect } from "react";
import styles from "./styles.module.scss";
import { Title } from "@/components/shared/ui/title";
import { Button } from "@mui/material";
import { FlightBigCard } from "@/components/entities/flightBigCard";
import { Add } from "@/components/shared/ui/add";
import { useAppDispatch, useAppSelector } from "@/components/shared/lib/store";
import { useParams } from "next/navigation";
import { fetchTrips, selectTrips } from "@/components/entities/Trip";
import { isTripsPairs } from "@/components/shared/quards/guards";
import { ITrip } from "@/components/shared/api/trip";
import { weekDayAndDatefromMs } from "@/components/shared/lib/flight";
import { MySnackBar } from "@/components/shared/ui/snackBar/ui";
import { useTranslation } from "next-i18next";
import { UseOrder } from "@/components/shared/lib/order/useOrder";
import dayjs from "dayjs";

export const Details = memo(() => {
  const useDispatch = useAppDispatch();
  const params = useParams<{ depart: string; return?: string }>();
  const { t } = useTranslation();
  const trips = useAppSelector(selectTrips);
  const {
    addToOrder,
    payedOrder,
    snackBarMessage,
    snackBarOpen,
    setSnackBarOpen,
  } = UseOrder(trips);

  useEffect(() => {
    dayjs.locale(t("city.lang"));
    useDispatch(fetchTrips({ params }));
  }, []);

  useEffect(() => {
    console.log("%%%", t("city.lang"));

    dayjs.locale(t("city.lang"));
  }, [t("city.lang")]);

  const FlightCards = memo(
    ({ trips }: { trips: ITrip[] | [ITrip[], ITrip[]] }) => {
      if (isTripsPairs(trips)) {
        return (
          <>
            <div className={styles.info}>
              <div className={styles.info__title}>
                {t("flight.outBound")}{" "}
                {weekDayAndDatefromMs(
                  +trips[0][0].departure_time,
                  t("city.lang"),
                )}
              </div>
              {trips && <FlightBigCard data={trips[0]} />}
            </div>
            <div className={styles.info}>
              <div className={styles.info__title}>
                {t("flight.return")}{" "}
                {weekDayAndDatefromMs(
                  +trips[1][0].departure_time,
                  t("city.lang"),
                )}
              </div>
              {trips && <FlightBigCard data={trips[1]} />}
            </div>
          </>
        );
      }

      return (
        <>
          <div className={styles.info}>
            <div className={styles.info__title}>
              {t("flight.return")}{" "}
              {weekDayAndDatefromMs(+trips[0].departure_time, t("city.lang"))}
            </div>
            {trips && <FlightBigCard data={trips} />}
          </div>
        </>
      );
    },
  );

  return (
    <div className={styles.main}>
      <div className="container">
        <div className={styles.body}>
          <Title color="#000" marginBottom="20px" size="medium">
            {t("flight.flightDetails")}
          </Title>
          <div className={styles.infos}>
            <div className={styles.flightInfos}>
              <div className={styles.data}>
                {trips && <FlightCards trips={trips} />}
              </div>

              <div className={styles.pay}>
                {payedOrder ? (
                  <Button variant="contained">{t("flight.paid")}</Button>
                ) : (
                  <Button onClick={addToOrder} variant="contained">
                    {t("flight.pay")}
                  </Button>
                )}
              </div>
            </div>
            <div className={styles.add}>
              <Add />
            </div>
          </div>
        </div>
      </div>
      <MySnackBar
        open={snackBarOpen}
        onChange={setSnackBarOpen}
        horizontal="center"
        vertical="bottom"
        message={snackBarMessage}
      />
    </div>
  );
});
