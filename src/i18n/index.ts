import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import signupEn from "../locales/en/signup.json";
import signupAr from "../locales/ar/signup.json";

const setDocumentDirection = (language: string) => {
  const isRtl = language.startsWith("ar");
  document.documentElement.lang = language;
  document.documentElement.dir = isRtl ? "rtl" : "ltr";
};

i18n.use(initReactI18next).init({
  resources: {
    en: {
      signup: signupEn,
    },
    ar: {
      signup: signupAr,
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

setDocumentDirection(i18n.language);
i18n.on("languageChanged", setDocumentDirection);

export default i18n;
