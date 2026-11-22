import { BellOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../assets/fonts/font_style";

export const NotificationsEmpty = () => {
  const { t } = useTranslation("notification");

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-secondary-200 bg-white px-6 py-12 text-center sm:py-16">
      <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-secondary-200 bg-secondary-50 text-secondary-400">
        <BellOff size={22} strokeWidth={1.8} />
      </span>
      <h2 className={`${FONT_STYLES.h4} text-secondary-900`}>
        {t("empty.title")}
      </h2>
      <p className={`${FONT_STYLES.bodySm} mt-1 max-w-sm text-secondary-500`}>
        {t("empty.description")}
      </p>
    </div>
  );
};
