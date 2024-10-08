'use client'
import { useState, useEffect } from "react";

export const UseIsMobile = (breakpoint: number = 768) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < breakpoint);
  };

  useEffect(() => {
    setIsMobile(window.innerWidth < breakpoint)
  }, [])

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};
