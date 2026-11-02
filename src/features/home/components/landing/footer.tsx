import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../assets/fonts/font_style";
import { LandingInView } from "./landing_in_view";

export const LandingFooter = () => {
  const { t } = useTranslation("landing");

  return (
    <LandingInView
      as="footer"
      className="border-t border-secondary-200 bg-white py-14"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 md:flex-row">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-start">
          <a href="#" className="inline-flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-600 text-white">
              <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} aria-hidden />
            </div>
            <span className={`${FONT_STYLES.body} font-bold text-secondary-900`}>
              {t("brand.name")}
            </span>
          </a>
          <span className="hidden text-secondary-300 sm:inline" aria-hidden>
            |
          </span>
          <span className={`${FONT_STYLES.caption} text-secondary-500`}>
            {t("brand.tagline")}
          </span>
        </div>

        <div
          className={`flex items-center gap-6 ${FONT_STYLES.caption} font-medium text-secondary-600`}
        >
          <a href="#features" className="transition-colors hover:text-primary-600">
            {t("footer.features")}
          </a>
          <a href="#faq" className="transition-colors hover:text-primary-600">
            {t("footer.faq")}
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-primary-600"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            {t("footer.github")}
          </a>
        </div>

        <span
          className={`inline-flex items-center rounded border border-secondary-200 bg-secondary-50 px-2.5 py-1 font-mono ${FONT_STYLES.caption} text-secondary-500`}
        >
          {t("footer.builtWith")}
        </span>
      </div>
    </LandingInView>
  );
};
