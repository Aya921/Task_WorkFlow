import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FONT_STYLES } from "../../../../assets/fonts/font_style";
import { ROUTES } from "../../../../routes/route_path";
import { Button } from "../../../../shared/components/button";

export const LandingHeader = () => {
  const { t } = useTranslation("landing");
  const navigate = useNavigate();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-secondary-200 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:h-[4.5rem]">
        <Button
          type="button"
          wrapperClassName="inline-flex"
          className="group gap-3 border-transparent bg-transparent p-0"
          activeClassName="text-secondary-900"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white shadow-md shadow-primary-500/20 transition-transform group-hover:scale-105">
            <CheckCircle2 className="h-5 w-5" strokeWidth={2.5} aria-hidden />
          </div>
          <span className="text-xl font-bold tracking-tight text-secondary-900">
            {t("brand.name")}
          </span>
        </Button>

        <nav
          className={`hidden items-center gap-8 ${FONT_STYLES.bodySm} font-medium text-secondary-600 md:flex`}
        >
          <a href="#features" className="transition-colors hover:text-primary-600">
            {t("nav.features")}
          </a>
          <a
            href="#how-it-works"
            className="transition-colors hover:text-primary-600"
          >
            {t("nav.howItWorks")}
          </a>
          <a href="#showcase" className="transition-colors hover:text-primary-600">
            {t("nav.overview")}
          </a>
          <a href="#faq" className="transition-colors hover:text-primary-600">
            {t("nav.faq")}
          </a>
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <Button
            type="button"
            onClick={() => {
              void navigate(ROUTES.LOGIN);
            }}
            wrapperClassName="inline-flex"
            className={`px-3 py-2 ${FONT_STYLES.bodySm}`}
            activeClassName="border-transparent bg-transparent font-medium text-secondary-700 hover:text-primary-600"
          >
            {t("nav.login")}
          </Button>
          <Button
            type="button"
            onClick={() => {
              void navigate(ROUTES.CREATE_USER);
            }}
            wrapperClassName="inline-flex"
            className={`px-4 py-2.5 ${FONT_STYLES.button} font-semibold shadow-sm shadow-primary-500/30 hover:-translate-y-0.5 hover:shadow`}
            activeClassName="bg-primary-600 text-white hover:bg-primary-700"
          >
            {t("nav.getStarted")}
          </Button>
        </div>
      </div>
    </header>
  );
};
