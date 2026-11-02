import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../assets/fonts/font_style";
import { Button } from "../../../../shared/components/button";
import { LandingInView } from "./landing_in_view";

export const LandingCallToActionBand = () => {
  const { t } = useTranslation("landing");

  return (
    <LandingInView
      className="relative overflow-hidden py-20 text-white"
      style={{
        background:
          "linear-gradient(135deg, #2563eb 0%, #3b82f6 35%, #ec4899 100%)",
      }}
    >
      <div className="pointer-events-none absolute -end-20 -bottom-20 h-96 w-96 rounded-full bg-pink-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -start-20 -top-20 h-96 w-96 rounded-full bg-primary-400/25 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <h2 className={`${FONT_STYLES.h1} mb-4 font-extrabold tracking-tight text-white`}>
          {t("cta.title")}
        </h2>
        <p className={`${FONT_STYLES.bodyLg} mx-auto mb-9 max-w-xl text-primary-50/90`}>
          {t("cta.description")}
        </p>
        <Button
          type="button"
          wrapperClassName="inline-flex justify-center"
          className={`rounded-xl px-8 py-4 ${FONT_STYLES.button} font-bold shadow-lg hover:scale-105`}
          activeClassName="bg-white text-primary-700"
        >
          {t("cta.button")}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
        </Button>
        <p className={`${FONT_STYLES.caption} mt-5 text-primary-100/80`}>
          {t("cta.note")}
        </p>
      </div>
    </LandingInView>
  );
};
