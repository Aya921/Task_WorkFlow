import { motion } from "framer-motion";
import { AlertTriangle, Calendar, Check } from "lucide-react";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import {
  LANDING_CARD_HOVER,
  LANDING_CARD_HOVER_TRANSITION,
} from "../landing_card_hover";

type PriorityTone = "low" | "medium" | "high" | "complete";

type LandingHeroTaskCardProps = {
  priority: string;
  priorityTone: PriorityTone;
  meta: string;
  title: string;
  date: string;
  assignee: string;
  assigneeTone?: "muted" | "primary" | "solid" | "emerald";
  variant?: "default" | "dragging" | "done";
  progress?: number;
  dateTone?: "muted" | "overdue" | "done";
};

const PRIORITY_CLASS: Record<PriorityTone, string> = {
  low: "border-primary-100 bg-primary-50 text-primary-700",
  medium: "border-amber-100 bg-amber-50 text-amber-700",
  high: "border-rose-100 bg-rose-50 text-rose-700",
  complete: "border-emerald-100 bg-emerald-50 text-emerald-700",
};

const ASSIGNEE_CLASS = {
  muted: "bg-secondary-200 text-secondary-600",
  primary: "bg-primary-100 text-primary-700",
  solid: "bg-primary-600 text-white",
  emerald: "bg-emerald-600 text-white",
} as const;

export const LandingHeroTaskCard = ({
  priority,
  priorityTone,
  meta,
  title,
  date,
  assignee,
  assigneeTone = "muted",
  variant = "default",
  progress,
  dateTone = "muted",
}: LandingHeroTaskCardProps) => {
  const shell =
    variant === "dragging"
      ? "scale-[1.02] -rotate-1 cursor-grab border-2 border-primary-500 shadow-xl"
      : variant === "done"
        ? "border border-secondary-200 opacity-90 shadow-sm"
        : "border border-secondary-200 shadow-sm transition-colors hover:border-secondary-300";

  return (
    <motion.div
      whileHover={variant === "dragging" ? undefined : LANDING_CARD_HOVER}
      transition={LANDING_CARD_HOVER_TRANSITION}
      className={`rounded-xl bg-white p-3.5 ${shell}`}
    >
      <div className="mb-2 flex items-center justify-between">
        <span
          className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold ${PRIORITY_CLASS[priorityTone]}`}
        >
          {priority}
        </span>
        <span
          className={`text-[11px] ${
            variant === "dragging"
              ? "rounded bg-primary-50 px-1.5 py-0.5 font-medium text-primary-600"
              : "font-mono text-secondary-400"
          }`}
        >
          {meta}
        </span>
      </div>

      <h4
        className={`mb-2 leading-snug ${FONT_STYLES.bodySm} font-semibold ${
          variant === "done"
            ? "text-secondary-700 line-through"
            : "text-secondary-900"
        }`}
      >
        {title}
      </h4>

      {typeof progress === "number" ? (
        <div className="mb-3 h-1.5 w-full rounded-full bg-secondary-100">
          <div
            className="h-1.5 rounded-full bg-primary-600"
            style={{ width: `${progress}%` }}
          />
        </div>
      ) : null}

      <div className="flex items-center justify-between border-t border-secondary-50 pt-2 text-[11px] text-secondary-500">
        <span
          className={`inline-flex items-center gap-1 ${
            dateTone === "overdue"
              ? "font-medium text-rose-600"
              : dateTone === "done"
                ? "font-medium text-emerald-600"
                : "text-secondary-400"
          }`}
        >
          {dateTone === "overdue" ? (
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden />
          ) : dateTone === "done" ? (
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
          ) : (
            <Calendar className="h-3.5 w-3.5" aria-hidden />
          )}
          {date}
        </span>
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${ASSIGNEE_CLASS[assigneeTone]}`}
        >
          {assignee}
        </span>
      </div>
    </motion.div>
  );
};
