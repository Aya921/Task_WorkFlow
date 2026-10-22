import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const LoginDesktopHeader = () => {
  const { t } = useTranslation("login");

  return (
    <div className="hidden items-center justify-end gap-1.5 pe-14 text-xs text-secondary-500 lg:flex">
      <span>{t("header.noAccount")}</span>
      <Link
        to="/signup/account"
        className="font-semibold text-primary-600 underline-offset-2 transition-colors duration-150 ease-out hover:text-primary-700 hover:underline motion-reduce:transition-none"
      >
        {t("header.createAccount")}
      </Link>
    </div>
  );
};
