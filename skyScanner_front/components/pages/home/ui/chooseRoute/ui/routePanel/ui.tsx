"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import dayjs from "dayjs";

import { Button } from "@mui/material";
import { Autocomplete } from "@/components/shared/ui/autocomplete";
import { DatePicker } from "@/components/shared/ui/datePicker/ui";
import { SeatPicker } from "@/components/shared/ui/seatPicker";
import { useRouter } from "next/navigation";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useTranslation } from "next-i18next";
import { UseRoutePanel } from "@/components/shared/lib/routePanel/useRoutePanel";
import { MySnackBar } from "@/components/shared/ui/snackBar/ui";
import { CityKeys } from "@/components/shared/api/city/types";
import clsx from "clsx";
dayjs.extend(utc);
dayjs.extend(timezone);

export const RoutePanel = () => {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const {
    depart,
    info,
    returnState,
    fromCityList,
    toCityList,
    validation,
    onSeatChange,
    onCityFromChange,
    onCityToChange,
    onDepartChange,
    onReturnChange,
    checkValidation,
    calendarTrips,
    calendarTripsLoading,
    validationState,
  } = UseRoutePanel();

  const findTrips = () => {
    checkValidation(info, depart);
    console.log(validation);
    if (!Object.entries(validation.current).every((el) => el[1] === true)) {
      setSnackBarOpen(true);
      return;
    }

    if (returnState) {
      router.push(
        `flights/${depart}/${returnState}/?from=${info.from}&to=${info.to}&seatNumber=${info.seatNumber}&seatClass=${info.seatClass}&sort=${info.sort}`,
      );
    } else {
      router.push(
        `flights/${depart}?from=${info.from}&to=${info.to}&seatNumber=${info.seatNumber}&seatClass=${info.seatClass}&sort=${info.sort}`,
      );
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.body}>
        <Autocomplete
          isValid={validationState.from}
          items={fromCityList.map((el) => {
            const lang = t("city.lang") as CityKeys;
            return el.name[lang];
          })}
          className={clsx(styles.first, styles.one)}
          label={t("chooseRoute.from")}
          placeholder={t("chooseRoute.city")}
          onChange={onCityFromChange}
        />

        <Autocomplete
          isValid={validationState.to}
          items={toCityList.map((el) => {
            const lang = t("city.lang") as CityKeys;
            return el.name[lang];
          })}
          label={t("chooseRoute.to")}
          className={clsx(styles.two)}
          placeholder={t("chooseRoute.city")}
          onChange={onCityToChange}
        />

        <DatePicker
          isValid={validationState.depart}
          value={dayjs(depart)}
          className={clsx(styles.three)}
          tripDays={calendarTrips.departTrips}
          label={t("chooseRoute.depart")}
          loading={calendarTripsLoading}
          onChange={onDepartChange}
        />

        <DatePicker
          value={returnState ? dayjs(returnState) : null}
          label={t("chooseRoute.return")}
          tripDays={calendarTrips.returnTrips}
          className={clsx(styles.four)}
          loading={calendarTripsLoading}
          onChange={onReturnChange}
        />

        <SeatPicker
          onChange={(e) => onSeatChange(e.seatNumber, e.seatClass)}
          className={clsx(styles.last, styles.five)}
          label={t("chooseRoute.classAndPlaces")}
          placeholder={t("chooseRoute.classAndPlacesPlaceHolder")}
        />
      </div>
      <Button onClick={findTrips} variant="contained">
        {t("chooseRoute.find")}
      </Button>

      <MySnackBar
        onChange={setSnackBarOpen}
        open={snackBarOpen}
        vertical="bottom"
        horizontal="center"
        message={"Заполните поля"}
      />
    </div>
  );
};
