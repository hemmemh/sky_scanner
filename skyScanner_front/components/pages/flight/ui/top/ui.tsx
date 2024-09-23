"use client";
import React, { useMemo } from "react";
import styles from "./styles.module.scss";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { Title } from "@/components/shared/ui/title";
import { IconButton } from "@mui/material";
import { useAppSelector } from "@/components/shared/lib/store";
import { selectTrips } from "@/components/entities/Trip";
import { UseLoves } from "@/components/shared/lib/loves/useLoves";
import { useTranslation } from "next-i18next";
import { CityKeys } from "@/components/shared/api/city/types";
import { isTripsPairs } from "@/components/shared/quards/guards";
import { useSearchParams } from "next/navigation";
export const Top = () => {

  const trips = useAppSelector(selectTrips);
  const { t } = useTranslation();
  const params = useSearchParams();
  const cityLang = t("city.lang") as CityKeys;

  const { addToLovesButton, deleteLovesButton, loved } = UseLoves(trips);
  
  const tripData = useMemo(() => {
    if (!trips) return { city: "", seatClass: "", seatNumber: "" };

    if (isTripsPairs(trips)) {
      return {
        city: trips[0][0].departure_city.name[cityLang],
        seatClass: trips[0][0].seatClass.name[cityLang],
        seatNumber: params.get("seatNumber") ?? "0",
      };
    } else {
      return {
        city: trips[0].departure_city.name[cityLang],
        seatClass: trips[0].seatClass.name[cityLang],
        seatNumber: params.get("seatNumber") ?? "0",
      };
    }
  }, [trips, cityLang]);

  return (
    <div className={styles.main}>
      <div className="container">
        <div className={styles.body}>
          <div className={styles.info}>
            <Title size="xl">{tripData.city}</Title>
            {trips && (
              <div className={styles.allInfo}>
                {" "}
                {tripData.seatNumber} {t("flight.ticket")}
                {isTripsPairs(trips) && "•Return"}•{tripData.seatClass}
              </div>
            )}
          </div>
          <div className={styles.favorite}>
            {loved && (
              <IconButton onClick={deleteLovesButton}>
                <MdFavorite color="white" />
              </IconButton>
            )}
            {!loved && (
              <IconButton onClick={addToLovesButton}>
                <MdFavoriteBorder color="white" />
              </IconButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
