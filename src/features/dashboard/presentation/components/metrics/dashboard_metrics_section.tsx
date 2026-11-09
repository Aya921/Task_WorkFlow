import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  LoaderCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import type { DashboardMetrics } from "../../../domain/entity/dashboard_metrics";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { MetricCard } from "./metric_card";

export type DashboardMetricsSectionProps = {
  metrics: DashboardMetrics;
};

export const DashboardMetricsSection = ({
  metrics,
}: DashboardMetricsSectionProps) => {
  const { t } = useTranslation("dashboard");

  const cards = [
    {
      key: "totalTasks",
      label: t("metrics.totalTasks"),
      value: metrics.totalTasks,
      icon: ClipboardList,
    },
    {
      key: "inProgress",
      label: t("metrics.inProgress"),
      value: metrics.inProgress,
      icon: LoaderCircle,
    },
    {
      key: "completed",
      label: t("metrics.completed"),
      value: metrics.completed,
      icon: CheckCircle2,
    },
    {
      key: "overdue",
      label: t("metrics.overdue"),
      value: metrics.overdue,
      icon: AlertTriangle,
      tone: "warning" as const,
    },
  ];

  return (
    <section className="space-y-4">
      <div>
        <p className={`${FONT_STYLES.overline} text-secondary-400`}>
          {t("metrics.sectionLabel")}
        </p>
        <h2 className={`${FONT_STYLES.h3} text-secondary-900`}>
          {t("metrics.title")}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <MetricCard
            key={card.key}
            label={card.label}
            value={card.value}
            icon={card.icon}
            tone={card.tone}
          />
        ))}
      </div>
    </section>
  );
};
