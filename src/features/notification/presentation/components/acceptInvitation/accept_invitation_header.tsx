import { FolderKanban, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";

type AcceptInvitationHeaderProps = {
  inviterName: string;
  onClose: () => void;
};

export const AcceptInvitationHeader = ({
  inviterName,
  onClose,
}: AcceptInvitationHeaderProps) => {
  const { t } = useTranslation("notification");

  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex min-w-0 items-start gap-3">
        <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary-100 bg-primary-50 text-primary-600">
          <FolderKanban size={16} strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <h2 className={`${FONT_STYLES.h4} text-secondary-900`}>
            {t("acceptInvitation.title")}
          </h2>
          <p className={`${FONT_STYLES.caption} mt-1 text-secondary-500`}>
            {t("acceptInvitation.subtitlePrefix")}{" "}
            <span className="font-semibold text-secondary-800">
              {inviterName}
            </span>{" "}
            {t("acceptInvitation.subtitleSuffix")}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label={t("acceptInvitation.close")}
        className="rounded-md p-1 text-secondary-400 transition-colors hover:bg-secondary-100 hover:text-secondary-700"
      >
        <X size={16} strokeWidth={2} />
      </button>
    </div>
  );
};
