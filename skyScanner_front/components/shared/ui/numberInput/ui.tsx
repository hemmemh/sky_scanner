"use client";
import React, { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

interface INumberInput {
  className?: string;
  value: number;
  setValue: (value: number) => void;
  placeholder?: string | undefined;
  min?: number;
  max?: number;
}

export const NumberInput: FC<INumberInput> = ({
  className,
  value,
  setValue,
  placeholder = "",
  min = 0,
  max = 100,
}) => {
  const [num, setNum] = useState(value);

  useEffect(() => {
    setNum(value);
  }, [value]);

  const onPlus = (a: number) => {
    const res = Math.min(max, a + 1);
    change(res);
  };

  const onMinus = (a: number) => {
    const res = Math.max(min, a - 1);
    change(res);
  };

  const onSetNum = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setNum(+target.value);
  };

  const change = (e: string | number) => {
    let num = +e;
    if (+e < min) {
      num = min;
    }

    if (+e > max) {
      num = max;
    }
    setValue(num);
  };

  const keyDone = (e: React.KeyboardEvent) => {
    const target = e.target as HTMLInputElement;
    if (e.keyCode === 13) {
      change(target.value);
    }
  };

  return (
    <div className={`${styles.MyNumber} ${className}`}>
      <div
        onClick={() => onMinus(value)}
        className={clsx(
          styles.Amount__change,
          { [styles.active]: num > min },
          styles._minus,
        )}
      ></div>
      <input
        type="number"
        onBlur={(e) => change(e.target.value)}
        onKeyDown={keyDone}
        onChange={onSetNum}
        value={num}
        placeholder={placeholder}
      />
      <div
        onClick={() => onPlus(value)}
        className={clsx(
          styles.Amount__change,
          { [styles.active]: num < max },
          styles._plus,
        )}
      ></div>
    </div>
  );
};
