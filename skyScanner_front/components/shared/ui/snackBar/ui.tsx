"use client";
import React, { FC, useEffect, useState } from "react";
import { Snackbar, SnackbarCloseReason, SnackbarOrigin } from "@mui/material";

interface IState extends SnackbarOrigin {
  open: boolean;
  message: string;
  onChange: (value: boolean) => void;
}

export const MySnackBar: FC<IState> = ({
  open,
  vertical,
  horizontal,
  message,
  onChange,
}) => {
  const [openBar, setOpenBar] = useState(open);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    onChange(false);
    if (reason === "clickaway") {
      return;
    }

    setOpenBar(false);
  };

  useEffect(() => {
    setOpenBar(open);
  }, [open]);

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={openBar}
      autoHideDuration={1000}
      onClose={handleClose}
      message={message}
      key={vertical + horizontal}
    />
  );
};
