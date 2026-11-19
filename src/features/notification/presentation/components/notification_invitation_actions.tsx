import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../assets/fonts/font_style";
import { Button } from "../../../../shared/components/button";

type NotificationInvitationActionsProps = {
  onAccept: () => void;
  onDecline: () => void;
  isDeclining?: boolean;
  errorMessage?: string | null;
};

export const NotificationInvitationActions = ({
  onAccept,
  onDecline,
  isDeclining = false,
  errorMessage,
}: NotificationInvitationActionsProps) => {
  const { t } = useTranslation("notification");

  return (
    <div className="mt-2 flex flex-col gap-1.5">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          onClick={onAccept}
          disabled={isDeclining}
          wrapperClassName="inline-flex"
          className={`px-3 py-1.5 ${FONT_STYLES.caption} font-semibold`}
          activeClassName="bg-primary-600 text-white hover:bg-primary-700"
          disabledClassName="bg-secondary-100 text-secondary-300"
        >
          {t("actions.accept")}
        </Button>
        <Button
          type="button"
          onClick={onDecline}
          isLoading={isDeclining}
          wrapperClassName="inline-flex"
          className={`px-3 py-1.5 ${FONT_STYLES.caption} font-semibold`}
          activeClassName="border-secondary-200 bg-white text-secondary-700 hover:bg-secondary-50"
          disabledClassName="border-secondary-100 bg-secondary-50 text-secondary-300"
        >
          {t("actions.decline")}
        </Button>
      </div>

      {errorMessage ? (
        <p
          role="alert"
          className={`${FONT_STYLES.caption} font-medium text-red-600`}
        >
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};
