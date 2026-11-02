import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../assets/fonts/font_style";
import { LandingInView } from "./landing_in_view";

export const LandingFaq = () => {
  const { t } = useTranslation("landing");
  const items = t("faq.items", { returnObjects: true }) as Array<{
    q: string;
    a: string;
  }>;

  return (
    <LandingInView id="faq" className="bg-secondary-50 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-14 text-center sm:mb-16">
          <p
            className={`${FONT_STYLES.overline} mb-3 font-bold tracking-widest text-primary-600`}
          >
            {t("faq.eyebrow")}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-secondary-900 md:text-4xl">
            {t("faq.title")}
          </h2>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <details
              key={item.q}
              open={index === 0}
              className="group rounded-xl border border-secondary-200 bg-white p-5 open:border-primary-300 open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 select-none">
                <span className={`${FONT_STYLES.body} font-semibold text-secondary-900`}>
                  {item.q}
                </span>
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary-100 text-secondary-500 transition-colors group-open:bg-primary-50 group-open:text-primary-600">
                  <ChevronDown
                    className="h-4 w-4 transition-transform group-open:rotate-180"
                    aria-hidden
                  />
                </span>
              </summary>
              <div
                className={`mt-3 border-t border-secondary-100 pt-2 ${FONT_STYLES.bodySm} leading-relaxed text-secondary-500`}
              >
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </LandingInView>
  );
};
