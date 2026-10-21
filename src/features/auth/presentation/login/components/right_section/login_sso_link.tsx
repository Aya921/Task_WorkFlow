import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../../assets/fonts/font_style";

export const LoginSsoLink = () => {
  const { t } = useTranslation("login");

  return (
    <div className="mt-6 text-center">
      <button
        type="button"
        className={`cursor-pointer ${FONT_STYLES.caption} text-secondary-500 transition hover:text-secondary-900 hover:underline`}
      >
        {t("links.sso")}
      </button>
    </div>
  );
};
