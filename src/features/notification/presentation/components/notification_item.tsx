import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../assets/fonts/font_style";
import type { NotificationEntity } from "../../domain/entity/notification";
import { formatRelativeTime } from "../../../dashboard/presentation/utils/format_relative_time";
import { NotificationIcon } from "./notification_icon";
import { NotificationAction } from "./acceptInvitation/notification_action";
import { DeleteInvitationDialog } from "./delete_invitation_dialog";
import { useNotificationContext } from "../hooks/use_notification_context";
import { useDeleteNotificationMutation } from "../hooks/use_delete_notification_mutation";

type NotificationItemProps = {
  notification: NotificationEntity;
};

export const NotificationItem = ({ notification }: NotificationItemProps) => {
  const { t, i18n } = useTranslation("notification");
  const { markAsRead } = useNotificationContext();
  const { deleteNotification, isDeleting, deleteError, resetDeleteError } =
    useDeleteNotificationMutation();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const relativeTime =
    formatRelativeTime(notification.createdAt, i18n.language) ??
    t("time.justNow");

  const [timeNow] = useState(() => Date.now());

  const isPendingInvitation =
    notification.type === "project_invitation" && !notification.isRead;
  const expiresAt = notification.data.expiresAt;
  const isExpired =
    isPendingInvitation &&
    Boolean(expiresAt) &&
    new Date(expiresAt as string).getTime() <= timeNow;

  // Deleting a still-actionable invitation declines it, so ask first.
  const requiresDeleteConfirmation = isPendingInvitation && !isExpired;

  const handleClick = () => {
    // Invitations are marked as read by the accept/decline RPCs, so the
    // action buttons stay available until the user responds.
    if (notification.type === "project_invitation") {
      return;
    }
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
  };

  const handleDeleteClick = () => {
    if (requiresDeleteConfirmation) {
      setIsConfirmOpen(true);
      return;
    }
    deleteNotification(notification.id);
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
    resetDeleteError();
  };

  return (
    <article
      className={`rounded-xl border px-3 py-3 transition-colors sm:px-4 ${
        notification.isRead
          ? "border-secondary-200 bg-white hover:bg-secondary-50/70"
          : "border-primary-100 bg-primary-50/40 hover:bg-primary-50/70"
      }`}
    >
      <div className="flex items-start gap-2">
        <button
          type="button"
          onClick={handleClick}
          className="flex min-w-0 flex-1 gap-3 text-start sm:gap-3.5"
        >
          <NotificationIcon type={notification.type} />

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3
                    className={`${FONT_STYLES.bodySm} font-semibold text-secondary-900`}
                  >
                    {notification.title}
                  </h3>
                  {!notification.isRead ? (
                    <span className="size-1.5 rounded-full bg-primary-600" />
                  ) : null}
                  {isExpired ? (
                    <span
                      className={`${FONT_STYLES.caption} rounded-full bg-red-50 px-2 py-0.5 font-semibold text-red-600`}
                    >
                      {t("status.expired")}
                    </span>
                  ) : null}
                </div>
                <p
                  className={`${FONT_STYLES.caption} mt-0.5 text-secondary-500`}
                >
                  {notification.message}
                </p>
              </div>

              <time
                dateTime={notification.createdAt}
                className={`${FONT_STYLES.caption} shrink-0 text-secondary-400`}
              >
                {relativeTime}
              </time>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={handleDeleteClick}
          disabled={isDeleting}
          aria-label={t("actions.delete")}
          title={t("actions.delete")}
          className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-secondary-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Trash2 size={16} aria-hidden="true" />
        </button>
      </div>

      {isPendingInvitation && !isExpired ? (
        <NotificationAction notification={notification} />
      ) : null}

      {deleteError && !isConfirmOpen ? (
        <p
          role="alert"
          className={`${FONT_STYLES.caption} mt-2 font-medium text-red-600`}
        >
          {deleteError}
        </p>
      ) : null}

      {isConfirmOpen ? (
        <DeleteInvitationDialog
          projectName={notification.data.projectName}
          isDeleting={isDeleting}
          errorMessage={deleteError}
          onCancel={handleCancelDelete}
          onConfirm={() => deleteNotification(notification.id)}
        />
      ) : null}
    </article>
  );
};
