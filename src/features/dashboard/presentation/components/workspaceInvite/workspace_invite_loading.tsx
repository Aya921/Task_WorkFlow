import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";

export const WorkspaceInviteLoading = () => {
  const { t } = useTranslation("dashboard");

  return (
    <p className={`${FONT_STYLES.caption} text-secondary-500`}>
      {t("workspaceInvite.loading")}
    </p>
  );
};
