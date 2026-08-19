import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../../assets/fonts/font_style";

export const WorkSpaceHeader = () => {
  const { t } = useTranslation("signup");

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 text-center">
      <h1 className={FONT_STYLES.h1}>{t("workspace.title")}</h1>
      <p className={FONT_STYLES.bodyLg}>{t("workspace.description")}</p>
    </div>
  );
};
