import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { formatDueDate } from "../../utils/format_due_date";

export type TaskDueDateCellProps = {
  dueDate: string | null;
};

export const TaskDueDateCell = ({ dueDate }: TaskDueDateCellProps) => {
  const { t, i18n } = useTranslation("dashboard");
  const formatted = formatDueDate(dueDate, i18n.language, {
    today: t("recentTasks.today"),
    tomorrow: t("recentTasks.tomorrow"),
  });

  if (!formatted) {
    return (
      <span className={`${FONT_STYLES.caption} text-secondary-400`}>—</span>
    );
  }

  const toneClass =
    formatted.tone === "urgent"
      ? "font-semibold text-rose-600"
      : formatted.tone === "soon"
        ? "font-semibold text-secondary-800"
        : "text-secondary-600";

  return (
    <span className={`${FONT_STYLES.caption} ${toneClass}`}>
      {formatted.label}
    </span>
  );
};
