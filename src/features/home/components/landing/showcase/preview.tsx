import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import {
  LANDING_CARD_HOVER,
  LANDING_CARD_HOVER_TRANSITION,
} from "../landing_card_hover";
import { ShowcasePreviewRecent } from "./preview_recent";
import { ShowcasePreviewStats } from "./preview_stats";

export const ShowcasePreview = () => {
  const { t } = useTranslation("landing");

  return (
    <motion.div
      whileHover={LANDING_CARD_HOVER}
      transition={LANDING_CARD_HOVER_TRANSITION}
      className="overflow-hidden rounded-2xl border border-secondary-200 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.05),0_10px_25px_-5px_rgba(15,23,42,0.04)]"
    >
      <div className="space-y-5 rounded-xl border border-secondary-200/80 bg-secondary-50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-secondary-200 pb-4">
          <div>
            <p
              className={`${FONT_STYLES.caption} font-semibold tracking-wider text-secondary-400 uppercase`}
            >
              {t("showcase.workspaceLabel")}
            </p>
            <h3 className={`${FONT_STYLES.h4} font-bold text-secondary-900`}>
              {t("showcase.overviewTitle")}
            </h3>
          </div>
          <div className="flex gap-2">
            <span
              className={`${FONT_STYLES.caption} rounded border border-secondary-200 bg-white px-2.5 py-1 font-medium text-secondary-700`}
            >
              {t("showcase.thisWeek")}
            </span>
            <span
              className={`${FONT_STYLES.caption} rounded bg-primary-600 px-3 py-1 font-semibold text-white shadow-sm`}
            >
              {t("showcase.newProject")}
            </span>
          </div>
        </div>

        <ShowcasePreviewStats />
        <ShowcasePreviewRecent />
      </div>
    </motion.div>
  );
};
