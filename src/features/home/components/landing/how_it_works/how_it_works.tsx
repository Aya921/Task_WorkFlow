import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { LandingInView } from "../landing_in_view";
import {
  HowMiniCreate,
  HowMiniOrganize,
  HowMiniTrack,
  LandingHowStep,
} from "./step";

export const LandingHowItWorks = () => {
  const { t } = useTranslation("landing");
  const steps = t("howItWorks.steps", { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  const minis = [
    <HowMiniCreate key="create" project={t("howItWorks.miniProject")} />,
    <HowMiniOrganize
      key="organize"
      priority={t("howItWorks.miniPriority")}
      date={t("howItWorks.miniDate")}
      task={t("howItWorks.miniTask")}
      assigned={t("howItWorks.miniAssigned")}
    />,
    <HowMiniTrack
      key="track"
      done={t("howItWorks.miniDone")}
      complete={t("howItWorks.miniComplete")}
    />,
  ];

  return (
    <LandingInView
      id="how-it-works"
      className="bg-secondary-50 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center sm:mb-20">
          <p
            className={`${FONT_STYLES.overline} mb-3 font-bold tracking-widest text-primary-600`}
          >
            {t("howItWorks.eyebrow")}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-secondary-900 md:text-4xl">
            {t("howItWorks.title")}
          </h2>
        </div>

        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="pointer-events-none absolute top-12 end-[16%] start-[16%] -z-10 hidden h-0.5 bg-secondary-200 md:block" />
          {steps.map((step, index) => (
            <LandingHowStep
              key={step.title}
              step={index + 1}
              title={step.title}
              description={step.description}
              mini={minis[index]}
            />
          ))}
        </div>
      </div>
    </LandingInView>
  );
};
