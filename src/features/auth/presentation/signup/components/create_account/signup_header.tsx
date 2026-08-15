import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../../assets/fonts/font_style";

export const SignupHeader = () => {
  const { t } = useTranslation("signup");

  return (
     <div className="flex flex-col gap-2">
      <h1 className={FONT_STYLES.h1}>{t("title")}</h1>
      <p className={FONT_STYLES.body}>{t("description")}</p>
    </div>
   
  );
};
