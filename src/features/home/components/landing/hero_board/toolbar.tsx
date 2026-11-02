import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";

export const LandingHeroBoardToolbar = () => {
  const { t } = useTranslation("landing");

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-secondary-100 bg-white px-4 py-4 sm:px-6">
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`${FONT_STYLES.caption} font-semibold tracking-wider text-secondary-400 uppercase`}
        >
          {t("hero.projectsPrefix")}
        </span>
        <h2 className={`${FONT_STYLES.body} font-bold text-secondary-900`}>
          {t("hero.projectName")}
        </h2>
        <span
          className={`${FONT_STYLES.caption} inline-flex items-center rounded-full border border-primary-100 bg-primary-50 px-2.5 py-0.5 font-medium text-primary-700`}
        >
          {t("hero.sprintBadge")}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex -space-x-2 rtl:space-x-reverse">
          {[
            { label: "SJ", className: "bg-primary-600" },
            { label: "AK", className: "bg-emerald-600" },
            { label: "TL", className: "bg-amber-600" },
          ].map((avatar) => (
            <span
              key={avatar.label}
              className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white ring-2 ring-white ${avatar.className}`}
            >
              {avatar.label}
            </span>
          ))}
        </div>
        <span
          className={`${FONT_STYLES.caption} inline-flex items-center gap-1.5 rounded-md bg-primary-600 px-3 py-1.5 font-medium text-white shadow-sm`}
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
          {t("hero.newTask")}
        </span>
      </div>
    </div>
  );
};
