import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";

const PRIORITY_STYLES: Record<string, string> = {
  low: "text-sky-600",
  medium: "text-amber-600",
  high: "text-rose-600",
  urgent: "text-fuchsia-700",
};

export type TaskPriorityBadgeProps = {
  priority: string;
};

export const TaskPriorityBadge = ({ priority }: TaskPriorityBadgeProps) => {
  const { t } = useTranslation("dashboard");
  const style = PRIORITY_STYLES[priority] ?? PRIORITY_STYLES.medium;

  return (
    <span className={`${FONT_STYLES.caption} font-semibold ${style}`}>
      {t(`recentTasks.priority.${priority}`, { defaultValue: priority })}
    </span>
  );
};
