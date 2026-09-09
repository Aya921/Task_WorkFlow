import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../../assets/fonts/font_style";
import { useAuth } from "../../../../../../hooks/use_auth";

export const VerificationHeader = () => {
  const { t } = useTranslation("signup");
  const { user } = useAuth();
  const email = user?.email;

  return (
    <div className="flex w-full min-w-0 flex-col items-center justify-center gap-2 text-center">
      <h1 className={FONT_STYLES.h1}>{t("verification.title")}</h1>
      <div className={`${FONT_STYLES.bodySm} space-y-1`}>
        <p>{t("verification.sentEmail", { email })}</p>
      </div>
    </div>
  );
};
