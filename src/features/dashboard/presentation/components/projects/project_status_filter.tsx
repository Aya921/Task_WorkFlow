import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";

export type ProjectStatusFilterValue = "active" | "all" | "archived";

export type ProjectStatusFilterProps = {
  value: ProjectStatusFilterValue;
  onChange: (value: ProjectStatusFilterValue) => void;
};

const OPTIONS: ProjectStatusFilterValue[] = ["active", "all", "archived"];

export const ProjectStatusFilter = ({
  value,
  onChange,
}: ProjectStatusFilterProps) => {
  const { t } = useTranslation("dashboard");

  return (
    <div
      role="tablist"
      aria-label={t("projects.filters.label")}
      className="inline-flex items-center rounded-full border border-secondary-200 bg-white p-1 shadow-sm"
    >
      {OPTIONS.map((option) => {
        const isActive = value === option;

        return (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option)}
            className={`${FONT_STYLES.caption} rounded-full px-3.5 py-1.5 font-semibold transition-colors ${
              isActive
                ? "bg-secondary-100 text-secondary-900"
                : "text-secondary-500 hover:text-secondary-700"
            }`}
          >
            {t(`projects.filters.${option}`)}
          </button>
        );
      })}
    </div>
  );
};
