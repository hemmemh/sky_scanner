"use client";
import { Footer } from "@/components/widgets/footer";
import { Header } from "@/components/widgets/header";
import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { useAppDispatch } from "@/components/shared/lib/store";
import { verifyUser } from "@/components/entities/user";
export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const useDispatch = useAppDispatch();

  useEffect(() => {
    useDispatch(verifyUser());
  }, []);

  return (
    <div className={styles.MainLayout}>
      <Header />
      <div className={styles.children}>{children}</div>

      <Footer />
    </div>
  );
};
