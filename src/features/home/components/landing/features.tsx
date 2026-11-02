import { CheckSquare, LayoutDashboard, LayoutGrid, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../assets/fonts/font_style";
import { LandingInView } from "./landing_in_view";

const FEATURE_META = [
  {
    Icon: LayoutGrid,
    tone: "border-sky-100 bg-sky-50 text-sky-600",
  },
  {
    Icon: CheckSquare,
    tone: "border-primary-100 bg-primary-50 text-primary-600",
  },
  {
    Icon: LayoutDashboard,
    tone: "border-sky-200 bg-sky-100/60 text-sky-700",
  },
  {
    Icon: Lock,
    tone: "border-emerald-100 bg-emerald-50 text-emerald-600",
  },
] as const;

export const LandingFeatures = () => {
  const { t } = useTranslation("landing");
  const items = t("features.items", { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  return (
    <LandingInView
      id="features"
      className="border-y border-secondary-200 bg-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-16">
          <p
            className={`${FONT_STYLES.overline} mb-3 font-bold tracking-widest text-primary-600`}
          >
            {t("features.eyebrow")}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-secondary-900 md:text-4xl">
            {t("features.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const meta = FEATURE_META[index] ?? FEATURE_META[0];
            const Icon = meta.Icon;
            return (
              <article
                key={item.title}
                className="group rounded-2xl border border-secondary-200 bg-white p-7 shadow-[0_1px_3px_rgba(15,23,42,0.05),0_10px_25px_-5px_rgba(15,23,42,0.04)] transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl border transition-colors group-hover:border-primary-600 group-hover:bg-primary-600 group-hover:text-white ${meta.tone}`}
                >
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className={`${FONT_STYLES.h4} mb-2 font-bold text-secondary-900`}>
                  {item.title}
                </h3>
                <p className={`${FONT_STYLES.bodySm} leading-relaxed text-secondary-500`}>
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </LandingInView>
  );
};
