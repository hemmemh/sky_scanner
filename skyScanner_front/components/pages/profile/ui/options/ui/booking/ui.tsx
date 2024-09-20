"use client";
import React from "react";
import styles from "./styles.module.scss";
import { Title } from "@/components/shared/ui/title";
import { IoIosArrowForward } from "react-icons/io";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { FlightData } from "@/components/shared/ui/flightData";
import { useAppSelector } from "@/components/shared/lib/store";
import { selectUser } from "@/components/entities/user";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import Image from "next/image";
export const Booking = () => {
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();
  const getCreateOrderDate = (date: Date) => {
    return dayjs(date).format("DD/MM/YYYY");
  };

  console.log("user?.orders", user?.orders);

  return (
    <div className={styles.main}>
      <div className={styles.body}>
        <Title className={styles.titleColor} size="large">
          {" "}
          {t(`profile.yourBookings`)}
        </Title>

        {user?.orders.map((order) => (
          <Accordion key={order.uid} sx={{ width: "100%" }}>
            <AccordionSummary
              expandIcon={<IoIosArrowForward />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              {t(`profile.orderFrom`)} {getCreateOrderDate(order.createdAt)}
            </AccordionSummary>
            <AccordionDetails>
              <div className={styles.item}>
                <div className={styles.item__component}>
                  <Image
                    alt="image"
                    width={100}
                    className={styles.image}
                    height={100}
                    src={`${process.env.NEXT_PUBLIC_API_STATIC_URL}companies/${order.from[0].company.image}`}
                    unoptimized
                  />
                  <FlightData data={order.from} />
                </div>
                {order.to.length !== 0 && (
                  <div className={styles.item__component}>
                    <Image
                      alt="image"
                      width={100}
                      className={styles.image}
                      height={100}
                      src={`${process.env.NEXT_PUBLIC_API_STATIC_URL}companies/${order.to[0].company.image}`}
                      unoptimized
                    />
                    <FlightData data={order.to} />
                  </div>
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};
