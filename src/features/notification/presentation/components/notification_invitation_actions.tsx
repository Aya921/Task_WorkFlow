import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../assets/fonts/font_style";
import { Button } from "../../../../shared/components/button";

type NotificationInvitationActionsProps = {
  onAccept: () => void;
  onDecline: () => void;
};

export const NotificationInvitationActions = ({
  onAccept,
  onDecline,
}: NotificationInvitationActionsProps) => {
  const { t } = useTranslation("notification");

  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      <Button
        type="button"
        onClick={onAccept}
        wrapperClassName="inline-flex"
        className={`px-3 py-1.5 ${FONT_STYLES.caption} font-semibold`}
        activeClassName="bg-primary-600 text-white hover:bg-primary-700"
      >
        {t("actions.accept")}
      </Button>
      <Button
        type="button"
        onClick={onDecline}
        wrapperClassName="inline-flex"
        className={`px-3 py-1.5 ${FONT_STYLES.caption} font-semibold`}
        activeClassName="border-secondary-200 bg-white text-secondary-700 hover:bg-secondary-50"
      >
        {t("actions.decline")}
      </Button>
    </div>
  );
};
