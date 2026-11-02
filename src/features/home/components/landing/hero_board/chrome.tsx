import { Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";

export const LandingHeroBoardChrome = () => {
  const { t } = useTranslation("landing");

  return (
    <div className="flex items-center justify-between border-b border-secondary-200 bg-secondary-50 px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-rose-400" />
        <span className="h-3 w-3 rounded-full bg-amber-400" />
        <span className="h-3 w-3 rounded-full bg-emerald-400" />
      </div>

      <div
        className={`hidden w-72 items-center justify-center gap-2 rounded-md border border-secondary-200 bg-white px-3 py-1 font-mono ${FONT_STYLES.caption} text-secondary-500 shadow-sm sm:flex`}
      >
        <Lock className="h-3 w-3 text-emerald-600" aria-hidden />
        <span dir="ltr">{t("hero.boardUrl")}</span>
      </div>

      <span
        className={`${FONT_STYLES.caption} rounded bg-primary-50 px-2 py-0.5 font-medium text-primary-700`}
      >
        {t("hero.activeSprint")}
      </span>
    </div>
  );
};
