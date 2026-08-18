import { RotateCw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../../assets/fonts/font_style";

export const ResendOtpBtn = () => {
  const { t } = useTranslation("signup");

  return (
    <div className="flex w-full justify-end">
      <button
        type="button"
        className="flex cursor-pointer items-center justify-center gap-2 text-primary-600 transition-colors duration-100 hover:text-primary-800"
        aria-label={t("verification.resend")}
      >
        <RotateCw className="h-4 w-4 shrink-0" aria-hidden />
        <span className={FONT_STYLES.bodySm}>{t("verification.resend")}</span>
      </button>
    </div>
  );
};
