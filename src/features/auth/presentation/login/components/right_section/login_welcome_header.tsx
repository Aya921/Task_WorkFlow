import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../../assets/fonts/font_style";

export const LoginWelcomeHeader = () => {
  const { t } = useTranslation("login");

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold tracking-tight text-secondary-900 sm:text-3xl">
        {t("title")}
      </h2>
      <p className={`mt-2 ${FONT_STYLES.bodySm} text-secondary-500`}>
        {t("description")}
      </p>
    </div>
  );
};
