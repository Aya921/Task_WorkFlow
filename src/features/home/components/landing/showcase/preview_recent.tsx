import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import {
  LANDING_CARD_HOVER,
  LANDING_CARD_HOVER_TRANSITION,
} from "../landing_card_hover";

const STATUS_TONE = [
  "bg-amber-50 text-amber-700",
  "bg-emerald-50 text-emerald-700",
  "bg-secondary-100 text-secondary-600",
] as const;

export const ShowcasePreviewRecent = () => {
  const { t } = useTranslation("landing");
  const recent = t("showcase.recent", { returnObjects: true }) as Array<{
    title: string;
    status: string;
  }>;

  return (
    <motion.div
      whileHover={LANDING_CARD_HOVER}
      transition={LANDING_CARD_HOVER_TRANSITION}
      className="overflow-hidden rounded-lg border border-secondary-200 bg-white"
    >
      <div className="flex items-center justify-between border-b border-secondary-100 bg-secondary-50/50 px-4 py-2.5">
        <span className={`${FONT_STYLES.caption} font-semibold text-secondary-800`}>
          {t("showcase.recentTitle")}
        </span>
        <span className={`${FONT_STYLES.caption} text-[11px] font-medium text-primary-600`}>
          {t("showcase.viewAll")}
        </span>
      </div>
      <div className={`divide-y divide-secondary-100 ${FONT_STYLES.caption}`}>
        {recent.map((row, index) => (
          <div
            key={row.title}
            className="flex items-center justify-between gap-3 px-4 py-2.5"
          >
            <span className="font-medium text-secondary-800">{row.title}</span>
            <span
              className={`shrink-0 rounded px-2 py-0.5 text-[10px] font-semibold ${STATUS_TONE[index]}`}
            >
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
