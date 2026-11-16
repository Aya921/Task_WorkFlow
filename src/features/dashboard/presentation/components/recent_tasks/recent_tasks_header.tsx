import { ArrowRight, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";

export type RecentTasksHeaderProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  totalTasks: number;
};

export const RecentTasksHeader = ({
  searchValue,
  onSearchChange,
  totalTasks,
}: RecentTasksHeaderProps) => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="flex flex-col gap-4 border-b border-secondary-100 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className={`${FONT_STYLES.h3} text-secondary-900`}>
          {t("recentTasks.title")}
        </h2>
        <span className={`${FONT_STYLES.caption} rounded-full bg-sky-50 px-2.5 py-1 font-semibold text-sky-700`}>
          {t("recentTasks.badge")}
        </span>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative block min-w-[220px] flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 start-3 h-4 w-4 -translate-y-1/2 text-secondary-400"
            aria-hidden
          />
          <input
            type="search"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={t("recentTasks.searchPlaceholder")}
            className={`${FONT_STYLES.bodySm} w-full rounded-xl border border-secondary-200 bg-secondary-50 py-2.5 pe-3 ps-9 text-secondary-800 outline-none transition focus:border-primary-300 focus:bg-white focus:ring-2 focus:ring-primary-100`}
          />
        </label>

        <button
          type="button"
          className={`${FONT_STYLES.caption} inline-flex items-center gap-1 font-semibold text-primary-600 hover:text-primary-700`}
        >
          {t("recentTasks.viewAll", { count: totalTasks })}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
};
