"use client";
import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { User } from "../user";
import { Booking } from "../booking";
import { OptionMenuContext } from "@/components/shared/ui/optionMenuProvider/ui";

export const Options = () => {
  const { option } = useContext(OptionMenuContext);

  return (
    <aside className={styles.main}>
      {option === 1 && <User />}
      {option === 2 && <Booking />}
    </aside>
  );
};
