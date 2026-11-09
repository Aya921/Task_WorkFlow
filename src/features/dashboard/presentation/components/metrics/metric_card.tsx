import type { LucideIcon } from "lucide-react";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";

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

  return (
    <article
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
        <span
          className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${
            isWarning
              ? "bg-rose-100 text-rose-600"
              : "bg-primary-50 text-primary-600"
          }`}
        >
          <Icon className="h-4 w-4" aria-hidden />
        </span>
      </div>

      <p
        className={`text-3xl font-bold tracking-tight ${
          isWarning ? "text-rose-600" : "text-secondary-900"
        }`}
      >
        {value}
      </p>
    </article>
  );
};
