"use client";
import React from "react";
import styles from "./styles.module.scss";

import { MainLayout } from "@/components/app/layouts/mainLayout";

import { useAppSelector } from "@/components/shared/lib/store";
import { selectUser } from "@/components/entities/user";

import { Title } from "@/components/shared/ui/title";
import { FlightLovesCard } from "@/components/entities/flightLovesCard";
import { useTranslation } from "react-i18next";

export const Loves = () => {
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();

  return (
    <MainLayout>
      <section className={styles.main}>
        <div className="container">
          <div className={styles.body}>
            <Title color="#000" size="large">
            {  t("loves.bookmarks")}
            </Title>
            <div className={styles.items}>
              {user?.loves.map((loves) => (
                <FlightLovesCard key={loves.uid} loves={loves} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};
