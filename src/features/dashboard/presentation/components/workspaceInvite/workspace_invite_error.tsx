import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { Button } from "../../../../../shared/components/button";

type WorkspaceInviteErrorProps = {
  message?: string | null;
  onRetry: () => void;
};

export const WorkspaceInviteError = ({
  message,
  onRetry,
}: WorkspaceInviteErrorProps) => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="flex flex-col gap-2">
      <p
        role="alert"
        className={`${FONT_STYLES.caption} font-medium text-red-600`}
      >
        {message || t("workspaceInvite.loadFailed")}
      </p>
      <Button
        type="button"
        onClick={onRetry}
        wrapperClassName="inline-flex"
        className={`px-3 py-1.5 ${FONT_STYLES.caption} font-semibold`}
        activeClassName="border-secondary-200 bg-white text-secondary-700 hover:bg-secondary-50"
      >
        {t("workspaceInvite.retry")}
      </Button>
    </div>
  );
};
