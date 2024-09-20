"use client";
import React, { FC, memo } from "react";
import styles from "./styles.module.scss";
import { Button, IconButton } from "@mui/material";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FlightData } from "@/components/shared/ui/flightData";
import { ITrip } from "@/components/shared/api/trip";
import { isTripsPairs } from "@/components/shared/quards/guards";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "next-i18next";

import { UseLoves } from "@/components/shared/lib/loves/useLoves";
import Image from "next/image";

interface IFlightCard {
  data: [ITrip[], ITrip[]] | ITrip[];
}

const Infos: FC<IFlightCard> = memo(({ data }) => {
  if (isTripsPairs(data)) {
    return (
      <>
        <div className={styles.info}>
          <div className={styles.info__company}>
            <Image
              alt="image"
              width={100}
              className={styles.image}
              height={100}
              src={`${process.env.NEXT_PUBLIC_API_STATIC_URL}companies/${data[0][0].company.image}`}
              unoptimized
            />
          </div>
          <FlightData data={data[0]} />
        </div>
        <div className={styles.info}>
          <div className={styles.info__company}>
            <Image
              alt="image"
              width={100}
              className={styles.image}
              height={100}
              src={`${process.env.NEXT_PUBLIC_API_STATIC_URL}companies/${data[1][0].company.image}`}
              unoptimized
            />
          </div>
          <FlightData data={data[1]} />
        </div>
      </>
    );
  } else {
    return (
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
    );
  }
});

const Price: FC<IFlightCard> = memo(({ data }) => {
  if (isTripsPairs(data)) {
    const firstPrice = data[0].reduce(
      (prev: number, current: ITrip) => prev + current.price,
      0,
    );
    const secondPrice = data[1].reduce(
      (prev: number, current: ITrip) => prev + current.price,
      0,
    );
    return (
      <div className={styles.actions__price}>{firstPrice + secondPrice}₽</div>
    );
  } else {
    const price = data.reduce(
      (prev: number, current: ITrip) => prev + current.price,
      0,
    );
    return <div className={styles.actions__price}>{price}₽</div>;
  }
});

const ImageAction: FC<IFlightCard> = memo(({ data }) => {
  if (isTripsPairs(data)) {
    return (
      <div className={styles.actions__image}>
        <Image
          alt="image"
          width={100}
          className={styles.image}
          height={100}
          src={`${process.env.NEXT_PUBLIC_API_STATIC_URL}companies/${data[0][0].company.image}`}
          unoptimized
        />
      </div>
    );
  } else {
    return (
      <div className={styles.actions__image}>
        <Image
          alt="image"
          width={100}
          className={styles.image}
          height={100}
          src={`${process.env.NEXT_PUBLIC_API_STATIC_URL}companies/${data[0].company.image}`}
          unoptimized
        />
      </div>
    );
  }
});

export const FlightCard: FC<IFlightCard> = memo(({ data }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const { addToLovesButton, deleteLovesButton, loved } = UseLoves(data);

  const selectTrip = () => {
    const seatNumber = searchParams.get("seatNumber") ?? "1";
    const seatClass = searchParams.get("seatClass") ?? "";
    if (isTripsPairs(data)) {
      console.log("data[0].join(", ")", data[0].join(","));

      router.push(
        `../../flight/${data[0].map((el) => el.uid).join(",")}/${data[1].map((el) => el.uid).join(",")}?seatNumber=${seatNumber}&seatClass=${seatClass}`,
      );
    } else {
      router.push(
        `/flight/${data.map((el) => el.uid).join(",")}?seatNumber=${seatNumber}&seatClass=${seatClass}`,
      );
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.body}>
        <div className={styles.infos}>
          <Infos data={data} />
        </div>
        <div className={styles.actions}>
          <div className={styles.actions__body}>
            <ImageAction data={data} />
            <Price data={data} />
            <Button
              onClick={selectTrip}
              variant="contained"
              endIcon={<FaArrowRightLong />}
            >
              {t("tripData.select")}
            </Button>
          </div>
          <div className={styles.actions__favorite}>
            {loved ? (
              <IconButton onClick={deleteLovesButton} aria-label="delete">
                <MdFavorite />
              </IconButton>
            ) : (
              <IconButton onClick={addToLovesButton} aria-label="delete">
                <MdFavoriteBorder />
              </IconButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
