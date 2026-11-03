import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import {
  LANDING_CARD_HOVER,
  LANDING_CARD_HOVER_TRANSITION,
} from "../landing_card_hover";

const STAT_HINT = [
  "text-emerald-600",
  "text-amber-600",
  "text-emerald-600",
  "text-rose-600",
] as const;

export const ShowcasePreviewStats = () => {
  const { t } = useTranslation("landing");
  const stats = t("showcase.stats", { returnObjects: true }) as Array<{
    label: string;
    value: string;
    hint: string;
  }>;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          whileHover={LANDING_CARD_HOVER}
          transition={LANDING_CARD_HOVER_TRANSITION}
          className={`rounded-lg border p-3 ${
            index === 3
              ? "border-rose-200 bg-rose-50/30"
              : "border-secondary-200 bg-white"
          }`}
        >
          <p
            className={`${FONT_STYLES.caption} text-[10px] font-semibold uppercase ${
              index === 3 ? "text-rose-500" : "text-secondary-400"
            }`}
          >
            {stat.label}
          </p>
          <p
            className={`mt-0.5 text-xl font-bold ${
              index === 3 ? "text-rose-600" : "text-secondary-900"
            }`}
          >
            {stat.value}
          </p>
          <p
            className={`${FONT_STYLES.caption} text-[10px] font-medium ${STAT_HINT[index]}`}
          >
            {stat.hint}
          </p>
        </motion.div>
      ))}
    </div>
  );
};
