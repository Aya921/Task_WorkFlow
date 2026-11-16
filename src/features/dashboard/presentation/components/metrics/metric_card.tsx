import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { useCountUp } from "../../hooks/use_count_up.ts";
import {
  DASHBOARD_CARD_HOVER,
  DASHBOARD_CARD_HOVER_TRANSITION,
  getDashboardItemVariants,
} from "../../motion/dashboard_motion";

export type MetricCardTone = "default" | "warning";

export type MetricCardProps = {
  label: string;
  value: number;
  icon: LucideIcon;
  tone?: MetricCardTone;
};

export const MetricCard = ({
  label,
  value,
  icon: Icon,
  tone = "default",
}: MetricCardProps) => {
  const isWarning = tone === "warning";
  const reduceMotion = Boolean(useReducedMotion());
  const displayValue = useCountUp(value);

  return (
    <motion.article
      variants={getDashboardItemVariants(reduceMotion)}
      whileHover={reduceMotion ? undefined : DASHBOARD_CARD_HOVER}
      transition={DASHBOARD_CARD_HOVER_TRANSITION}
      className={`rounded-2xl border p-4 sm:p-5 ${
        isWarning
          ? "border-rose-200 bg-rose-50/40"
          : "border-secondary-200 bg-white"
      }`}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <p
          className={`${FONT_STYLES.caption} font-semibold uppercase tracking-wide ${
            isWarning ? "text-rose-500" : "text-secondary-400"
          }`}
        >
          {label}
        </p>
        <motion.span
          whileHover={reduceMotion ? undefined : { scale: 1.08, rotate: 6 }}
          transition={{ type: "spring", stiffness: 360, damping: 18 }}
          className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${
            isWarning
              ? "bg-rose-100 text-rose-600"
              : "bg-primary-50 text-primary-600"
          }`}
        >
          <Icon className="h-4 w-4" aria-hidden />
        </motion.span>
      </div>

      <p
        className={`text-3xl font-bold tracking-tight ${
          isWarning ? "text-rose-600" : "text-secondary-900"
        }`}
      >
        {displayValue}
      </p>
    </motion.article>
  );
};
