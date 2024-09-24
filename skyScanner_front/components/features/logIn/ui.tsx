"use client";
import React, { FC, useEffect } from "react";
import styles from "./styles.module.scss";
import { Button, IconButton, Input, Modal } from "@mui/material";
import Image from "next/image";
import logo from "@/public/logo-blue.svg";
import { Title } from "@/components/shared/ui/title";
import { IoMdClose } from "react-icons/io";
import { UseLogin } from "@/components/shared/lib/login";
import { MySnackBar } from "@/components/shared/ui/snackBar";
const closeStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
};

interface ILogIn {
  onChange: (value: boolean) => void;
  value: boolean;
}

export const LogIn: FC<ILogIn> = ({ onChange, value }) => {
  const [open, setOpen] = React.useState(value);
  const {
    onRegistrationClick,
    onloginClick,
    setEmail,
    email ,
    password,
    setPassword,
    setSnackBarOpen,
    snackBarMessage,
    snackBarOpen } = UseLogin({ onChange:setOpen })
  useEffect(() => {
    setOpen(value);
  }, [value]);

  const handleClose = () => {
    setOpen(false);
    onChange(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div className={styles.body}>
          <div className={styles.logo}>
            <Image src={logo} alt="logo" />
          </div>
          <Title className={styles.titleColor} size="large">
            Get the full experience
          </Title>
          <div className={styles.text}>
            Track prices, make trip planning easier and enjoy faster booking.
          </div>
          <div className={styles.action}>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="пароль  "
            />
          </div>
          <div className={styles.button}>
            <Button
              onClick={onloginClick}
              variant="contained"
              sx={{ width: "100%" }}
            >
              Войти
            </Button>
          </div>
          <div className={styles.button}>
            <Button
              onClick={onRegistrationClick}
              variant="contained"
              sx={{ width: "100%", marginTop: "10px" }}
            >
              Регистрация
            </Button>
          </div>

          <IconButton onClick={handleClose} sx={closeStyle}>
            <IoMdClose />
          </IconButton>
        </div>
      </Modal>
      <MySnackBar
        onChange={(e) => setSnackBarOpen(e)}
        open={snackBarOpen}
        vertical="bottom"
        horizontal="center"
        message={snackBarMessage}
      />
    </>
  );
};
