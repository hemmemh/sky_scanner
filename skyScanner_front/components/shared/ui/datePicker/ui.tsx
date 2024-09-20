"use client";
import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { Input } from "../input";

import { DateCalendar, PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { IoIosClose } from "react-icons/io";
import { useTranslation } from "next-i18next";
import { UseIsMobile } from "../../lib/useMibile/UseIsMobile";
import { CircularProgress } from "@mui/material";

interface Autocomplete {
  value?: Dayjs | null;
  className?: string;
  label?: string;
  isValid?: boolean;
  tripDays?: number[];
  loading?: boolean;
  onChange: (value: Dayjs | null) => void;
}

export const DatePicker: FC<Autocomplete> = memo(
  ({
    className = "default",
    onChange,
    label,
    value = dayjs(),
    isValid = true,
    tripDays,
    loading = false,
  }) => {
    const [day, setDay] = useState<Dayjs | null>(value);
    const today = dayjs();
    const [calendarOpen, setCalendarOpen] = useState(false);
    const calendarRef = useRef(null);
    const caseRef = useRef(null);
    const { t } = useTranslation();
    const isMobile = UseIsMobile();

    useEffect(() => {}, [isMobile]);

    const calendarStyle = {
      display: calendarOpen ? "block" : "none",
      boxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.2)",
      position: "absolute",
      background: "#fff",
      top: isMobile ? "calc(50% - 168px)" : "calc(100% + 2px)",
      left: isMobile ? "calc(50% - 160px)" : "0",
      zIndex: "2200",
    };

    const dateClick = (day: Dayjs | null) => {
      setDay(day);
      onChange(day);
    };

    const closeCalendar = useCallback(
      (e: MouseEvent) => {
        if (!calendarRef.current) return;
        if (!caseRef.current) return;
        const target = e.target as HTMLElement;

        const calendar = calendarRef.current as HTMLElement;
        const datePicker = caseRef.current as HTMLElement;
        const close = datePicker.querySelector(`.${styles.case__reset}`);
        if (!close) return;

        if (target.classList.contains("MuiPickersDay-root")) {
          setCalendarOpen(false);
          return;
        }

        if (
          datePicker.contains(target) &&
          target !== close &&
          !close.contains(target)
        ) {
          setCalendarOpen(true);
          return;
        }

        if (calendar?.contains(target)) {
          setCalendarOpen(true);
          return;
        }

        setCalendarOpen(false);
      },
      [calendarRef, caseRef],
    );

    const ServerDay = useCallback(
      (props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) => {
        const { day, outsideCurrentMonth, ...other } = props;
        let isSelected = false;
        if (tripDays) {
          const finded = tripDays.find((el) => day.isSame(dayjs(el), "date"));
          finded && (isSelected = true);
        }

        return (
          <PickersDay
            sx={{ background: isSelected ? "#8d9bb5" : "#fff" }}
            {...other}
            outsideCurrentMonth={outsideCurrentMonth}
            day={day}
          />
        );
      },
      [tripDays],
    );

    useEffect(() => {
      console.log("day", day);

      document.addEventListener("click", closeCalendar);

      return () => {
        document.removeEventListener("click", closeCalendar);
      };
    }, []);

    return (
      <div
        ref={caseRef}
        className={clsx(
          styles.case,
          className,
          { [styles.active]: calendarOpen },
          { [styles.inValid]: !isValid },
        )}
      >
        <div className={styles.case__body}>
          <div className={styles.case__info}>
            <div className={styles.case__upText}>{label}</div>
            <div>
              <Input
                readOnly
                value={day ? day.format("DD/MM/YYYY") : t("chooseRoute.date")}
              />
              <DateCalendar
                sx={calendarStyle}
                ref={calendarRef}
                minDate={today}
                onChange={dateClick}
                slots={{
                  day: ServerDay,
                }}
              />
            </div>
          </div>
          <div
            onClick={() => dateClick(null)}
            className={clsx(styles.case__reset, {
              [styles.case__reset_active]: day,
            })}
          >
            <IoIosClose size={30} />
          </div>
          {loading && (
            <div className={styles.loader}>
              <CircularProgress size={15} />
            </div>
          )}
        </div>
      </div>
    );
  },
);
