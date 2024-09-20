"use client";
import React, { FC } from "react";
import styles from "./styles.module.scss";
import { Button, IconButton } from "@mui/material";
import { MdFavorite } from "react-icons/md";
import { FlightData } from "@/components/shared/ui/flightData";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { useAppDispatch, useAppSelector } from "@/components/shared/lib/store";
import { deleteLovesAction, selectUser } from "../user";
import { ILoves } from "@/components/shared/api/loves";
import { CityKeys } from "@/components/shared/api/city/types";
import { monthAndDayFromMs } from "@/components/shared/lib/flight/day";

interface IFlightLovesCard {
  loves: ILoves;
}

export const FlightLovesCard: FC<IFlightLovesCard> = ({ loves }) => {
  const user = useAppSelector(selectUser);
  const router = useRouter();
  const useDispatch = useAppDispatch();
  const { t } = useTranslation();
  console.log("loves", loves);

  const lang = t("city.lang") as CityKeys;
  const deleteLovesButton = (data: ILoves) => {
    if (!user) return;

    useDispatch(deleteLovesAction(data.uid));
  };

  const selectTrip = () => {
    if (loves?.to) {
      router.push(
        `../../flight/${loves.from_positions.join(",")}/${loves.to_positions.join(",")}?seatNumber=${loves.seatNumber}`,
      );
    } else {
      router.push(
        `/flight/${loves.from_positions.join(",")}?seatNumber=${loves.seatNumber}`,
      );
    }
  };

  return (
    <div className={styles.item}>
      <div className={styles.item__top}>
        <div className={styles.cities}>
          <div className={styles.city}>
            {loves.from[0].departure_city.name[lang]}
          </div>
          {loves?.to.length !== 0 && <div className={styles.divide}></div>}
          {loves?.to.length !== 0 && (
            <div className={styles.city}>
              {loves.to[0].departure_city.name[lang]}
            </div>
          )}
        </div>
        <IconButton
          onClick={() => deleteLovesButton(loves)}
          aria-label="delete"
        >
          <MdFavorite />
        </IconButton>
      </div>
      <div className={styles.item__flights}>
        <div className={styles.item__component}>
          <FlightData data={loves.from} />
        </div>
        {loves?.to.length !== 0 && (
          <div className={styles.item__component}>
            <FlightData data={loves.to} />
          </div>
        )}
      </div>
      <div className={styles.item__bottom}>
        <div className={styles.item__dateCover}>
          <div className={styles.item__date}>
            {monthAndDayFromMs(+loves.from[0].departure_time, t("city.lang"))}
            {loves?.to.length !== 0 && <div className={styles.divide}></div>}
          </div>
          {loves?.to.length !== 0 && (
            <div className={styles.item__date}>
              {monthAndDayFromMs(+loves.to[0].departure_time, t("city.lang"))}
            </div>
          )}
        </div>
        <Button onClick={selectTrip} className={styles.item__button}>
          Перейти
        </Button>
      </div>
    </div>
  );
};
