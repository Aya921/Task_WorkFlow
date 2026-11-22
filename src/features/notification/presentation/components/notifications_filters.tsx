import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../assets/fonts/font_style";
import type { NotificationFilter } from "../types/notification_filter";

type NotificationsFiltersProps = {
  value: NotificationFilter;
  onChange: (value: NotificationFilter) => void;
};

const FILTERS: NotificationFilter[] = ["all", "unread"];

export const NotificationsFilters = ({
  value,
  onChange,
}: NotificationsFiltersProps) => {
  const { t } = useTranslation("notification");

  return (
    <div
      className="flex flex-wrap gap-2"
      role="tablist"
      aria-label={t("filters.label")}
    >
      {FILTERS.map((filter) => {
        const isActive = value === filter;
        return (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(filter)}
            className={`${FONT_STYLES.caption} rounded-full px-3 py-1.5 font-semibold transition-colors ${
              isActive
                ? "bg-primary-600 text-white"
                : "bg-secondary-100 text-secondary-600 hover:bg-secondary-200"
            }`}
          >
            {t(`filters.${filter}`)}
          </button>
        );
      })}
    </div>
  );
};
