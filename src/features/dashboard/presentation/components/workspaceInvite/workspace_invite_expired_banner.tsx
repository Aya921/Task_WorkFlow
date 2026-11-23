import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";

export const WorkspaceInviteExpiredBanner = () => {
  const { t } = useTranslation("dashboard");

  return (
    <p
      role="status"
      className={`${FONT_STYLES.caption} rounded-lg bg-red-50 px-3 py-2 font-medium text-red-600`}
    >
      {t("workspaceInvite.expiredMessage")}
    </p>
  );
};
