"use client";

import React from "react";

import { useAppDispatch } from "../store";

import { setPofile } from "@/components/entities/user";

import { useTranslation } from "next-i18next";
import { login, registration } from "../../api/user/user";

interface useLogin {
  onChange: (value: boolean) => void;
}
export const UseLogin = ({ onChange }: useLogin) => {
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState("");
  const useDispatch = useAppDispatch();
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const { t } = useTranslation();

  const onRegistrationClick = () => {
    registration({ email, password })
      .then(() => {
        setSnackBarMessage(t("login.successfulRegister"));
        setSnackBarOpen(true);
        setPassword("");
        setEmail("");
      })
      .catch((data) => {
        console.log("dd", data);
        const message = data.response.data.message;
        if (Array.isArray(message)) {
          setSnackBarMessage(data.response.data.message[0]);
        } else {
          setSnackBarMessage(data.response.data.message);
        }

        setSnackBarOpen(true);
      });
  };

  const onloginClick = () => {
    login({ email, password })
      .then((data) => {
        localStorage.setItem("access_token", data.access_token);
        useDispatch(setPofile(data.user));
        setSnackBarMessage(t("login.successfulLogin"));
        setSnackBarOpen(true);
        setPassword("");
        setEmail("");
        onChange(false);
      })
      .catch((data) => {
        console.log("dd", data);
        const message = data.response.data.message;
        if (Array.isArray(message)) {
          setSnackBarMessage(data.response.data.message[0]);
        } else {
          setSnackBarMessage(data.response.data.message);
        }

        setSnackBarOpen(true);
      });
  };

  return {
    onRegistrationClick,
    onloginClick,
    snackBarOpen,
    snackBarMessage,
    password,
    email,
    setEmail,
    setPassword,
    setSnackBarOpen,
  };
};
