"use client";
import React, { createContext, FC, ReactNode, useState } from "react";

interface IOptionMenuContextType {
  option: number;
  setOption: (value: number) => void;
}

export const OptionMenuContext = createContext<IOptionMenuContextType>({
  option: 1,
  setOption: () => {},
});

export const OptionMenuProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [option, setOption] = useState(1);

  return (
    <OptionMenuContext.Provider value={{ option, setOption }}>
      {children}
    </OptionMenuContext.Provider>
  );
};
