import { useTranslation } from "react-i18next";
import { LoginKanbanPreview } from "./login_kanban_preview";

export const LoginBackgroundHeader = () => {
    const { t } = useTranslation("login");
    return(
        <div className="relative z-10 my-auto max-w-lg py-8">
        <div className="mb-8 space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-primary-100 uppercase backdrop-blur-md">
            {t("brand.badge")}
          </span>
          <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-white sm:text-5xl">
            {t("brand.headline")}
          </h1>
          <p className="text-base leading-relaxed text-primary-50/90">
            {t("brand.description")}
          </p>
        </div>

        <LoginKanbanPreview />
      </div>
    )
}