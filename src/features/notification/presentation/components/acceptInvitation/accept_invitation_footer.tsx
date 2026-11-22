import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { Button } from "../../../../../shared/components/button";

type AcceptInvitationFooterProps = {
  onCancel: () => void;
  isSubmitting?: boolean;
  errorMessage?: string | null;
};

export const AcceptInvitationFooter = ({
  onCancel,
  isSubmitting = false,
  errorMessage,
}: AcceptInvitationFooterProps) => {
  const { t } = useTranslation("notification");

  return (
    <div className="flex w-full flex-col gap-2">
      {errorMessage ? (
        <p
          role="alert"
          className={`${FONT_STYLES.caption} font-medium text-red-600`}
        >
          {errorMessage}
        </p>
      ) : null}

      <div className="flex w-full flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-2">
        <Button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          wrapperClassName="w-full sm:w-auto"
          className={`w-full px-3 py-2 ${FONT_STYLES.caption} font-semibold sm:w-auto`}
          activeClassName="border-secondary-200 bg-white text-secondary-700 hover:bg-secondary-50"
          disabledClassName="border-secondary-100 bg-secondary-50 text-secondary-300"
        >
          {t("acceptInvitation.actions.cancel")}
        </Button>

        <Button
          type="submit"
          isLoading={isSubmitting}
          wrapperClassName="w-full sm:w-auto"
          className={`w-full px-3 py-2 ${FONT_STYLES.caption} font-semibold sm:w-auto`}
          activeClassName="border-secondary-200 bg-white text-secondary-900 hover:bg-secondary-50"
          disabledClassName="border-secondary-100 bg-secondary-50 text-secondary-300"
        >
          {t("acceptInvitation.actions.confirm")}
          <ArrowRight size={14} strokeWidth={2.5} className="rtl:rotate-180" />
        </Button>
      </div>
    </div>
  );
};
