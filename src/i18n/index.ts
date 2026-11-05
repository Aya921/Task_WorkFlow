import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import signupEn from "../locales/en/signup.json";
import signupAr from "../locales/ar/signup.json";
import loginEn from "../locales/en/login.json";
import loginAr from "../locales/ar/login.json";
import commonEn from "../locales/en/common.json";
import commonAr from "../locales/ar/common.json";
import landingEn from "../locales/en/landing.json";
import landingAr from "../locales/ar/landing.json";
import dashboardEn from "../locales/en/dashboard.json";
import dashboardAr from "../locales/ar/dashboard.json";

const setDocumentDirection = (language: string) => {
  const isRtl = language.startsWith("ar");
  document.documentElement.lang = language;
  document.documentElement.dir = isRtl ? "rtl" : "ltr";
};

void i18n.use(initReactI18next).init({
  resources: {
    en: {
      signup: signupEn,
      login: loginEn,
      common: commonEn,
      landing: landingEn,
      dashboard: dashboardEn,
    },
    ar: {
      signup: signupAr,
      login: loginAr,
      common: commonAr,
      landing: landingAr,
      dashboard: dashboardAr,
    },
  },

  lng: "en",
  fallbackLng: "en",
  ns: ["signup", "login", "common", "landing", "dashboard"],
  defaultNS: "signup",

  interpolation: {
    escapeValue: false,
  },
});

setDocumentDirection(i18n.language);
i18n.on("languageChanged", setDocumentDirection);

export default i18n;
