"use client";
import React, { InputHTMLAttributes, forwardRef } from "react";
import styles from "./styles.module.scss";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ ...props }, ref) => {
  return <input {...props} className={styles.input} type="text" ref={ref} />;
});
