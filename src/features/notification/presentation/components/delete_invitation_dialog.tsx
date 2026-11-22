import { useEffect } from "react";
import { TriangleAlert } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../assets/fonts/font_style";
import { Button } from "../../../../shared/components/button";

type DeleteInvitationDialogProps = {
  projectName?: string;
  isDeleting: boolean;
  errorMessage?: string | null;
  onCancel: () => void;
  onConfirm: () => void;
};

export const DeleteInvitationDialog = ({
  projectName,
  isDeleting,
  errorMessage,
  onCancel,
  onConfirm,
}: DeleteInvitationDialogProps) => {
  const { t } = useTranslation("notification");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isDeleting) {
        onCancel();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onCancel, isDeleting]);

  const handleCancel = () => {
    if (!isDeleting) {
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label={t("deleteInvitation.cancel")}
        className="absolute inset-0 bg-black/45 backdrop-blur-sm"
        onClick={handleCancel}
      />

      <dialog
        open
        aria-labelledby="delete-invitation-title"
        aria-describedby="delete-invitation-description"
        className="relative z-10 m-0 flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-secondary-100 bg-white p-5 shadow-xl"
      >
        <div className="flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
            <TriangleAlert size={18} aria-hidden="true" />
          </span>

          <div className="min-w-0">
            <h2
              id="delete-invitation-title"
              className={`${FONT_STYLES.bodySm} font-semibold text-secondary-900`}
            >
              {t("deleteInvitation.title")}
            </h2>
            <p
              id="delete-invitation-description"
              className={`${FONT_STYLES.caption} mt-1 text-secondary-500`}
            >
              {t("deleteInvitation.description", {
                project: projectName || t("deleteInvitation.fallbackProject"),
              })}
            </p>
          </div>
        </div>

        {errorMessage ? (
          <p
            role="alert"
            className={`${FONT_STYLES.caption} font-medium text-red-600`}
          >
            {errorMessage}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center justify-end gap-2">
          <Button
            type="button"
            onClick={handleCancel}
            disabled={isDeleting}
            wrapperClassName="inline-flex"
            className={`px-3 py-1.5 ${FONT_STYLES.caption} font-semibold`}
            activeClassName="border-secondary-200 bg-white text-secondary-700 hover:bg-secondary-50"
            disabledClassName="border-secondary-100 bg-secondary-50 text-secondary-300"
          >
            {t("deleteInvitation.cancel")}
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            isLoading={isDeleting}
            wrapperClassName="inline-flex"
            className={`px-3 py-1.5 ${FONT_STYLES.caption} font-semibold`}
            activeClassName="bg-red-600 text-white hover:bg-red-700"
            disabledClassName="bg-red-100 text-red-300"
          >
            {t("deleteInvitation.confirm")}
          </Button>
        </div>
      </dialog>
    </div>
  );
};
