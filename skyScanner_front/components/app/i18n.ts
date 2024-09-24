import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { chooseRouteLng, destinationLng, infoLng } from "../shared/i18n/home";
import { footerLng } from "../shared/i18n/footer";
import { tripFilterLng } from "../shared/i18n/tripFilter";
import { tripSortLng } from "../shared/i18n/tripSort";
import { advertiseLng } from "../shared/i18n/advertise";
import { tripDataLng } from "../shared/i18n/tripData";
import { flightLng } from "../shared/i18n/flight";
import { loginLng } from "../shared/i18n/logIn";
import { languageChangeLng } from "../shared/i18n/languageChange";
import { profileLng } from "../shared/i18n/profile";
import { cityLng } from "../shared/i18n/city";

const languageDetector = new LanguageDetector();
languageDetector.addDetector({
  name: 'customDetector',
  lookup () {
    const detectedLng = window.navigator.language || 'ru';
    return detectedLng.split('-')[0]; // Обрезаем региональную часть, оставляем только язык
  }
});

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    detection: {
      order: ['customDetector', 'cookie', 'localStorage', 'sessionStorage', 'querystring', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
    },
    debug: true,
    fallbackLng: "ru",
    supportedLngs: ['de', 'en', 'ru',],

    interpolation: {
      escapeValue: false,
    },
    resources: {
      ru: {
        translation: {
          destination: destinationLng.ru,
          infoHome: infoLng.ru,
          chooseRoute: chooseRouteLng.ru,
          footer: footerLng.ru,
          tripFilter: tripFilterLng.ru,
          tripSort: tripSortLng.ru,
          advertise: advertiseLng.ru,
          tripData: tripDataLng.ru,
          flight: flightLng.ru,
          login: loginLng.ru,
          languageChange: languageChangeLng.ru,
          profile: profileLng.ru,
          city: cityLng.ru,
        },
      },
      en: {
        translation: {
          destination: destinationLng.en,
          infoHome: infoLng.en,
          chooseRoute: chooseRouteLng.en,
          footer: footerLng.en,
          tripFilter: tripFilterLng.en,
          tripSort: tripSortLng.en,
          advertise: advertiseLng.en,
          tripData: tripDataLng.en,
          flight: flightLng.en,
          login: loginLng.en,
          languageChange: languageChangeLng.en,
          profile: profileLng.en,
          city: cityLng.en,
        },
      },
      de: {
        translation: {
          destination: destinationLng.de,
          infoHome: infoLng.de,
          chooseRoute: chooseRouteLng.de,
          footer: footerLng.de,
          tripFilter: tripFilterLng.de,
          tripSort: tripSortLng.de,
          advertise: advertiseLng.de,
          flight: flightLng.de,
          login: loginLng.de,
          languageChange: languageChangeLng.de,
          profile: profileLng.de,
          city: cityLng.de,
        },
      },
    },
  });

export default i18n;
