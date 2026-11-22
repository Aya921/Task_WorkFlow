import { FolderKanban, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";

type AcceptInvitationProjectCardProps = {
  projectName: string;
  workspaceName: string;
  invitedRole?: string;
};

export const AcceptInvitationProjectCard = ({
  projectName,
  workspaceName,
  invitedRole,
}: AcceptInvitationProjectCardProps) => {
  const { t } = useTranslation("notification");

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-secondary-200 bg-secondary-50/80 px-3 py-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary-100 bg-primary-50 text-primary-600">
          <FolderKanban size={16} strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <p
            className={`${FONT_STYLES.bodySm} truncate font-semibold text-secondary-900`}
          >
            {projectName}
          </p>
          <p className={`${FONT_STYLES.caption} truncate text-secondary-500`}>
            {workspaceName}
          </p>
        </div>
      </div>

      {invitedRole ? (
        <span
          className={`${FONT_STYLES.caption} inline-flex shrink-0 items-center gap-1 rounded-full border border-primary-100 bg-primary-50 px-2.5 py-1 font-semibold text-primary-700`}
          title={t("acceptInvitation.invitedRole")}
        >
          <Shield size={12} strokeWidth={2} />
          {invitedRole}
        </span>
      ) : null}
    </div>
  );
};
