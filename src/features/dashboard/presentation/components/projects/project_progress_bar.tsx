import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { DASHBOARD_EASE } from "../../motion/dashboard_motion";

export type ProjectProgressBarProps = {
  progress: number;
  color?: string | null;
};

export const ProjectProgressBar = ({
  progress,
  color,
}: ProjectProgressBarProps) => {
  const { t } = useTranslation("dashboard");
  const reduceMotion = Boolean(useReducedMotion());
  const safeProgress = Math.max(0, Math.min(100, progress));
  const barColor = color || "var(--color-primary-600, #4f46e5)";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className={`${FONT_STYLES.caption} text-secondary-500`}>
          {t("projects.progress")}
        </span>
        <span className={`${FONT_STYLES.caption} font-semibold text-secondary-700`}>
          {safeProgress}%
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary-100">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: barColor }}
          initial={reduceMotion ? false : { width: 0 }}
          animate={{ width: `${safeProgress}%` }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.9, ease: DASHBOARD_EASE, delay: 0.12 }
          }
        />
      </div>
    </div>
  );
};
