import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../../assets/fonts/font_style";
import { LoginBrandMark } from "../left_section/login_brand_mark";

export const LoginMobileHeader = () => {
  const { t } = useTranslation("login");

  return (
    <div className="mb-4 flex items-center justify-between border-b border-secondary-200 pb-6 lg:hidden">
      <LoginBrandMark name={t("brand.name")} variant="dark" />
      <Link
        to="/signup/account"
        className={`${FONT_STYLES.caption} font-semibold text-primary-600 underline-offset-2 transition-colors duration-150 ease-out hover:text-primary-700 hover:underline motion-reduce:transition-none`}
      >
        {t("header.createAccountShort")}
      </Link>
    </div>
  );
};
