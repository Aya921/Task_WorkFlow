import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../../assets/fonts/font_style";

export const LoginMobileSignupPrompt = () => {
  const { t } = useTranslation("login");

  return (
    <div className="mt-8 border-t border-secondary-200 pt-6 text-center lg:hidden">
      <p className={`${FONT_STYLES.caption} text-secondary-500`}>
        {t("header.noAccount")}{" "}
        <Link
          to="/signup/account"
          className="ms-1 font-semibold text-primary-600 hover:text-primary-700"
        >
          {t("header.createAccount")}
        </Link>
      </p>
    </div>
  );
};
