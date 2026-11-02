import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Check, PlayCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../assets/fonts/font_style";
import { Button } from "../../../../shared/components/button";
import { LandingHeroBoard } from "./hero_board/board";
import { LandingInView } from "./landing_in_view";

export const LandingHero = () => {
  const { t } = useTranslation("landing");
  const reduceMotion = Boolean(useReducedMotion());

  const trustItems = [
    t("hero.trustNoCard"),
    t("hero.trustSetup"),
    t("hero.trustFree"),
  ];

  const words = [
    { key: "plan", text: t("hero.titlePlan"), accent: false },
    { key: "track", text: t("hero.titleTrack"), accent: false },
    { key: "ship", text: t("hero.titleAccent"), accent: true },
  ] as const;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: reduceMotion ? 0 : 0.1 },
    },
  };

  const wordVariants: Variants = {
    hidden: reduceMotion
      ? { opacity: 1, x: 0 }
      : { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.5, type: "spring", stiffness: 100 },
    },
  };

  return (
    <LandingInView className="relative overflow-hidden pt-16 pb-24 sm:pt-20 sm:pb-28">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle 650px at 50% 180px, rgba(37, 99, 235, 0.12), rgba(236, 72, 153, 0.04) 60%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-secondary-200 bg-white px-3.5 py-1.5 shadow-sm transition-colors hover:border-primary-200">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary-600" />
          <span className={`${FONT_STYLES.caption} text-secondary-500`}>
            {t("hero.badgeLead")}
          </span>
          <span className={`${FONT_STYLES.caption} font-medium text-primary-600`}>
            {t("hero.badgeTrail")}
          </span>
        </div>

        <motion.h1
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          className="mx-auto mb-6 max-w-4xl text-5xl leading-[1.08] font-extrabold tracking-tight text-secondary-900 md:text-7xl"
        >
          {words.map((word) => (
            <motion.span
              key={word.key}
              className="mx-3 inline-block"
              variants={wordVariants}
            >
              {word.accent ? (
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #2563eb 0%, #3b82f6 35%, #ec4899 100%)",
                  }}
                >
                  {word.text}
                </span>
              ) : (
                word.text
              )}
            </motion.span>
          ))}
        </motion.h1>

        <p
          className={`${FONT_STYLES.bodyLg} mx-auto mb-10 max-w-2xl leading-relaxed text-secondary-500`}
        >
          {t("hero.description")}
        </p>

        <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:mb-16 sm:flex-row">
          <Button
            type="button"
            wrapperClassName="w-full sm:w-auto"
            className={`w-full px-6 py-3.5 ${FONT_STYLES.button} font-semibold shadow-md shadow-primary-500/25 hover:-translate-y-0.5 sm:w-auto`}
            activeClassName="bg-primary-600 text-white hover:bg-primary-700"
          >
            {t("hero.primaryCta")}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
          </Button>
          <a
         
            href="#how-it-works"
            className={`inline-flex w-full items-center justify-center gap-2 rounded-lg border border-secondary-200 bg-white px-6 py-3.5 ${FONT_STYLES.button} font-medium text-secondary-700 shadow-sm transition-colors hover:border-secondary-300 hover:bg-secondary-50 sm:w-auto`}
          >
            <PlayCircle className="h-4 w-4 text-secondary-500" aria-hidden />
            {t("hero.secondaryCta")}
          </a>
        </div>

        <div
          className={`mb-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 ${FONT_STYLES.caption} font-medium text-secondary-400`}
        >
          {trustItems.map((label, index) => (
            <span key={label} className="inline-flex items-center gap-1.5">
              {index > 0 ? (
                <span className="me-4 hidden text-secondary-300 sm:inline" aria-hidden>
                  •
                </span>
              ) : null}
              <Check className="h-4 w-4 text-emerald-500" strokeWidth={2.5} aria-hidden />
              {label}
            </span>
          ))}
        </div>

        <LandingHeroBoard />
      </div>
    </LandingInView>
  );
};
