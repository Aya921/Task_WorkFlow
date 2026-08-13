import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";

export const SignupHeader = () => {
  const { t } = useTranslation("signup");

  return (
    <div>
      <span className={`font-semibold ${FONT_STYLES.h1}`}>
        {t("title")}
      </span>

      <p className={` ${FONT_STYLES.body}`}>
        {t("description")}
      </p>
    </div>
  );
};