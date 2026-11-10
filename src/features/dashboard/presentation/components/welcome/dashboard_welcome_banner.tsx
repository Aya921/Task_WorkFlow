import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { getDashboardItemVariants } from "../../motion/dashboard_motion";

type WelcomeQuote = {
  text: string;
  author: string;
};

export type DashboardWelcomeBannerProps = {
  userName?: string;
};

const getRandomQuoteIndex = (quotesLength: number) => {
  if (quotesLength <= 0) {
    return 0;
  }

  return Math.floor(Math.random() * quotesLength);
};

export const DashboardWelcomeBanner = ({
  userName,
}: DashboardWelcomeBannerProps) => {
  const { t } = useTranslation("dashboard");
  const reduceMotion = Boolean(useReducedMotion());

  const quotes = t("welcome.quotes", {
    returnObjects: true,
  }) as WelcomeQuote[];

  const safeQuotes = Array.isArray(quotes) ? quotes : [];
  const [quoteIndex] = useState(() => getRandomQuoteIndex(safeQuotes.length));

  const currentQuote =
    safeQuotes.length > 0
      ? safeQuotes[quoteIndex % safeQuotes.length]
      : null;

  return (
    <motion.section
      variants={getDashboardItemVariants(reduceMotion)}
      className="rounded-2xl border border-secondary-200 bg-white/90 p-5 shadow-sm"
    >
      <div className="space-y-2">
        <h1 className={`${FONT_STYLES.h3} text-secondary-900`}>
          {t("welcome.greeting", {
            name: userName?.trim() || t("welcome.fallbackName"),
          })}{" "}
          <span aria-hidden>{t("welcome.emoji")}</span>
        </h1>

        {currentQuote ? (
          <blockquote className="max-w-3xl">
            <p className={`${FONT_STYLES.body} text-secondary-600 italic`}>
              “{currentQuote.text}”
            </p>
            <footer
              className={`${FONT_STYLES.caption} mt-1 font-semibold text-secondary-400`}
            >
              — {currentQuote.author}
            </footer>
          </blockquote>
        ) : null}
      </div>
    </motion.section>
  );
};
