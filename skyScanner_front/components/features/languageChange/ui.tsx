"use client";
import React, { FC, memo, useEffect } from "react";
import styles from "./styles.module.scss";
import {
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Title } from "@/components/shared/ui/title";
import { IoMdClose } from "react-icons/io";
import { IoLanguageSharp } from "react-icons/io5";
import lngs, { LngsKeys } from "@/components/shared/i18n/lng";
import { useTranslation } from "next-i18next";

interface ILanguageChange {
  onChange: (value: boolean) => void;
  value: boolean;
}

export const LanguageChange: FC<ILanguageChange> = memo(
  ({ onChange, value }) => {
    useEffect(() => {
      setOpen(value);
    }, [value]);

    useEffect(() => {
      const lng = localStorage.getItem("i18nextLng");
      if (lng) setLanguage(lng);
    }, []);

    const { t, i18n } = useTranslation();
    const [open, setOpen] = React.useState(value);
    const [language, setLanguage] = React.useState(Object.keys(lngs)[0]);

    const LanguageChange = (event: SelectChangeEvent) => {
      setLanguage(event.target.value);
    };

    const handleClose = () => {
      setOpen(false);
      onChange(false);
      const lng = localStorage.getItem("i18nextLng");
      if (lng) setLanguage(lng);
    };

    const onSave = () => {
      i18n.changeLanguage(language);

      handleClose();
    };

    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div className={styles.body}>
          <div className={styles.header}>
            <Title color="#000" size="small">
              {t(`languageChange.regionalSettings`)}
            </Title>
            <IconButton onClick={handleClose}>
              <IoMdClose />
            </IconButton>
          </div>
          <div className={styles.actions}>
            <div className={styles.actions__top}>
              <IoLanguageSharp />
              <div className={styles.actions__title}>
                {t(`languageChange.language`)}
              </div>
            </div>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={language}
                label="Age"
                onChange={LanguageChange}
              >
                {Object.keys(lngs).map((lng) => (
                  <MenuItem key={lng} value={lng}>
                    {lngs[lng as LngsKeys].nativeName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={styles.buttons}>
            <Button onClick={onSave} variant="contained" sx={{ width: "100%" }}>
              {t(`languageChange.save`)}
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{ width: "100%" }}
            >
              {t(`languageChange.cancel`)}
            </Button>
          </div>
        </div>
      </Modal>
    );
  },
);
