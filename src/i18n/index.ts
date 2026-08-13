import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import signupEn from "../locales/en/signup.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      signup: signupEn,
    },
   
  },

  lng: "en",
  fallbackLng: "en",
  ns: ["signup"],
  defaultNS: "signup",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;