import { FolderPlus, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";

type CreateProjectHeaderProps = {
  onClose: () => void;
};

export const CreateProjectHeader = ({ onClose }: CreateProjectHeaderProps) => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="flex w-full items-start justify-between gap-4">
      <div className="flex min-w-0 items-start gap-3 sm:gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-primary-200 bg-primary-50/70">
          <FolderPlus size={18} strokeWidth={2} className="text-primary-600" />
        </span>

        <div className="min-w-0 flex-1">
          <h2 className={`${FONT_STYLES.h3} text-secondary-900`}>
            {t("createProject.title")}
          </h2>
          <p className={`${FONT_STYLES.bodySm} mt-1 text-secondary-500`}>
            {t("createProject.subtitle")}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label={t("createProject.close")}
        className="rounded-lg p-1.5 text-secondary-400 transition-colors hover:bg-secondary-100 hover:text-secondary-700"
      >
        <X size={18} strokeWidth={2} />
      </button>
    </div>
  );
};
