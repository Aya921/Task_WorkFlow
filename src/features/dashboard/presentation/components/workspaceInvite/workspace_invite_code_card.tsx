import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";

type WorkspaceInviteCodeCardProps = {
  inviteCode: string;
  isExpired: boolean;
  expiresAtLabel?: string | null;
};

export const WorkspaceInviteCodeCard = ({
  inviteCode,
  isExpired,
  expiresAtLabel,
}: WorkspaceInviteCodeCardProps) => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="rounded-xl border border-secondary-200 bg-secondary-50 p-4 text-center">
      <p className={`${FONT_STYLES.caption} mb-2 text-secondary-500`}>
        {t("workspaceInvite.codeLabel")}
      </p>
      <p
        className={`${FONT_STYLES.h3} font-mono tracking-wider text-secondary-900`}
      >
        {inviteCode || "—"}
      </p>
      {expiresAtLabel ? (
        <p className={`${FONT_STYLES.caption} mt-2 text-secondary-400`}>
          {isExpired
            ? t("workspaceInvite.expiredAt", { date: expiresAtLabel })
            : t("workspaceInvite.expiresAt", { date: expiresAtLabel })}
        </p>
      ) : null}
    </div>
  );
};
