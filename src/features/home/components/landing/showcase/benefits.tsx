import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";

export const ShowcaseBenefits = () => {
  const { t } = useTranslation("landing");
  const benefits = t("showcase.benefits", { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  return (
    <div>
      <p
        className={`${FONT_STYLES.overline} mb-2 block font-bold tracking-widest text-primary-600`}
      >
        {t("showcase.eyebrow")}
      </p>
      <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-secondary-900">
        {t("showcase.title")}
      </h2>
      <p className={`${FONT_STYLES.body} mb-8 leading-relaxed text-secondary-500`}>
        {t("showcase.description")}
      </p>
      <div className="space-y-4">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="flex items-start gap-3">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden />
            </div>
            <div>
              <h4 className={`${FONT_STYLES.bodySm} font-bold text-secondary-900`}>
                {benefit.title}
              </h4>
              <p className={`${FONT_STYLES.caption} mt-0.5 text-secondary-500`}>
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
