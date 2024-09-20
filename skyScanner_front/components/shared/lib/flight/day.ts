import dayjs from "dayjs";
import "dayjs/locale/ru";
import "dayjs/locale/de";
export const msToHoursAndMinutes = (startDate: number, endDate: number) => {
  const start = dayjs(startDate).format("HH:mm");
  const end = dayjs(endDate).format("HH:mm");
  const duration = dayjs.duration(endDate - startDate);

  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes() + 1;

  return { start, end, hours, minutes };
};

export const weekDayAndDatefromMs = (date: number, locale: string) => {
  console.log("df", locale);

  const weekDay = dayjs(date).day();
  const data = dayjs(date).date();
  const month = dayjs(date).locale(locale).format("MMM");
  const year = dayjs(date).year();

  return `${weekDay}, ${data} ${month} ${year}`;
};

export const monthAndDayFromMs = (date: number, locale: string) => {
  const data = dayjs(date).date();
  const month = dayjs(date).locale(locale).format("MMM");

  return `${data} ${month}`;
};

export const getHoursFromMs = (e: number) => {
  e = e / 3600000;
  return e % 1 === 0 ? e.toFixed(0) : e.toFixed(1);
};

export const getHoursAndMinutesFromMs = (e: number) => {
  e = e / 3600000;
  return e % 1 === 0 ? e.toFixed(0) : e.toFixed(1);
};

export const getHoursAndMinutes = (date: number) => {
  console.log(" dayjs().utcOffset()", dayjs().utcOffset());
  const offset = dayjs().utcOffset() / 60;
  const calculatedHour = Math.floor(date / 60); // Get the integer division result for hours
  const calculatedMinute = date % 60; // Get the remainder for minutes

  // Format into HH:mm
  return dayjs()
    .hour(calculatedHour)
    .minute(calculatedMinute)
    .add(offset, "hour")
    .format("HH:mm");
};
