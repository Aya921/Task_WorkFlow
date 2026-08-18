import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../../assets/fonts/font_style";
import { useSignupContext } from "../../hooks/use_signup_context";

export const VerificationHeader = () => {
  const { t } = useTranslation("signup");
  const { signupData } = useSignupContext();
  const email = signupData.email;

  return (
    <div className="flex w-full min-w-0 flex-col items-center justify-center gap-2 text-center">
      <h1 className={FONT_STYLES.h1}>{t("verification.title")}</h1>
      <div className={`${FONT_STYLES.bodySm} space-y-1`}>
        <p>{t("verification.sentCode", { email })}</p>
        <p>{t("verification.enterCode")}</p>
      </div>
    </div>
  );
};
