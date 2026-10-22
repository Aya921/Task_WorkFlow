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
          className="ms-1 font-semibold text-primary-600 underline-offset-2 transition-colors duration-150 ease-out hover:text-primary-700 hover:underline motion-reduce:transition-none"
        >
          {t("header.createAccount")}
        </Link>
      </p>
    </div>
  );
};
