import { RotateCw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../../assets/fonts/font_style";
import { Button } from "../../../../../../shared/components/button";

export const ResendOtpBtn = () => {
  const { t } = useTranslation("signup");

  return (
    <div className="flex w-full justify-end">
      <Button
        type="button"
        aria-label={t("verification.resend")}
        wrapperClassName="inline-flex"
        className="p-0"
        activeClassName="border-transparent bg-transparent text-primary-600 hover:text-primary-800"
      >
        <RotateCw className="h-4 w-4 shrink-0" aria-hidden />
        <span className={FONT_STYLES.bodySm}>{t("verification.resend")}</span>
      </Button>
    </div>
  );
};
