import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { Button } from "../../../../../shared/components/button";

export type RecentTasksFooterProps = {
  visibleCount: number;
  totalTasks: number;
};

export const RecentTasksFooter = ({
  visibleCount,
  totalTasks,
}: RecentTasksFooterProps) => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="flex flex-col gap-3 border-t border-secondary-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <Button
        type="button"
        wrapperClassName="inline-flex"
        className="rounded-xl px-4 py-2 text-sm font-semibold"
        activeClassName="border border-dashed border-secondary-300 bg-white text-secondary-700 hover:border-primary-300 hover:text-primary-700"
      >
        <Plus className="h-4 w-4" aria-hidden />
        <span>{t("recentTasks.createTask")}</span>
        <kbd className={`${FONT_STYLES.caption} rounded border border-secondary-200 bg-secondary-50 px-1.5 py-0.5 text-secondary-500`}>
          c
        </kbd>
      </Button>

      <p className={`${FONT_STYLES.caption} text-secondary-500`}>
        {t("recentTasks.showing", {
          visible: visibleCount,
          total: totalTasks,
        })}
      </p>
    </div>
  );
};
