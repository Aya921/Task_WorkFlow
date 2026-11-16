import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../assets/fonts/font_style";
import { Button } from "../../../../shared/components/button";

type NotificationsErrorProps = {
  message?: string | null;
  onRetry: () => void;
};

export const NotificationsError = ({
  message,
  onRetry,
}: NotificationsErrorProps) => {
  const { t } = useTranslation("notification");

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-rose-200 bg-rose-50/60 px-6 py-10 text-center">
      <h2 className={`${FONT_STYLES.h4} text-rose-700`}>{t("error.title")}</h2>
      <p className={`${FONT_STYLES.bodySm} mt-1 max-w-sm text-rose-600`}>
        {message ?? t("error.description")}
      </p>
      <Button
        type="button"
        onClick={onRetry}
        wrapperClassName="mt-4 inline-flex"
        className={`px-4 py-2 ${FONT_STYLES.caption} font-semibold`}
        activeClassName="bg-rose-600 text-white hover:bg-rose-700"
      >
        {t("error.retry")}
      </Button>
    </div>
  );
};
