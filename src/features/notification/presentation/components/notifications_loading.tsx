import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../assets/fonts/font_style";

export const NotificationsLoading = () => {
  const { t } = useTranslation("notification");

  return (
    <div className="flex flex-col gap-3">
      <p className={`${FONT_STYLES.caption} text-secondary-400`}>
        {t("loading")}
      </p>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-20 animate-pulse rounded-xl border border-secondary-100 bg-secondary-50"
        />
      ))}
    </div>
  );
};
