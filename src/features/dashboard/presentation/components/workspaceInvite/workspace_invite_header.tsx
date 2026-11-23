import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";

export const WorkspaceInviteHeader = () => {
  const { t } = useTranslation("dashboard");

  return (
    <div>
      <h2
        id="workspace-invite-title"
        className={`${FONT_STYLES.bodySm} font-semibold text-secondary-900`}
      >
        {t("workspaceInvite.title")}
      </h2>
      <p
        id="workspace-invite-description"
        className={`${FONT_STYLES.caption} mt-1 text-secondary-500`}
      >
        {t("workspaceInvite.description")}
      </p>
    </div>
  );
};
