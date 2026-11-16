import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../assets/fonts/font_style";
import { Button } from "../../../../shared/components/button";

type NotificationsHeaderProps = {
  unreadCount: number;
  onMarkAllAsRead: () => void;
};

export const NotificationsHeader = ({
  unreadCount,
  onMarkAllAsRead,
}: NotificationsHeaderProps) => {
  const { t } = useTranslation("notification");

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <h1 className={`${FONT_STYLES.h3} text-secondary-900`}>
          {t("title")}
        </h1>
        <span
          className={`${FONT_STYLES.caption} rounded-full bg-primary-50 px-2.5 py-1 font-semibold text-primary-700`}
        >
          {t("unreadCount", { count: unreadCount })}
        </span>
      </div>

      <Button
        type="button"
        onClick={onMarkAllAsRead}
        disabled={unreadCount === 0}
        wrapperClassName="inline-flex self-start sm:self-auto"
        className={`px-3 py-1.5 ${FONT_STYLES.caption} font-semibold`}
        activeClassName="border-secondary-200 bg-white text-secondary-700 hover:bg-secondary-50"
        disabledClassName="border-secondary-100 bg-secondary-50 text-secondary-300"
      >
        {t("actions.markAllRead")}
      </Button>
    </div>
  );
};
