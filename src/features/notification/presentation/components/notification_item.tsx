import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../assets/fonts/font_style";
import type { Notification } from "../../domain/entity/notification";
import { formatRelativeTime } from "../../../dashboard/presentation/utils/format_relative_time";
import { NotificationIcon } from "./notification_icon";
import { NotificationInvitationActions } from "./notification_invitation_actions";

type NotificationItemProps = {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onAcceptInvitation: (id: string) => void;
  onDeclineInvitation: (id: string) => void;
};

export const NotificationItem = ({
  notification,
  onMarkAsRead,
  onAcceptInvitation,
  onDeclineInvitation,
}: NotificationItemProps) => {
  const { t, i18n } = useTranslation("notification");
  const relativeTime =
    formatRelativeTime(notification.createdAt, i18n.language) ??
    t("time.justNow");

  const handleClick = () => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <button
      
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleClick();
        }
      }}
      className={`flex gap-3 rounded-xl border px-3 py-3 transition-colors sm:gap-3.5 sm:px-4 ${
        notification.isRead
          ? "border-secondary-200 bg-white hover:bg-secondary-50/70"
          : "border-primary-100 bg-primary-50/40 hover:bg-primary-50/70"
      }`}
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
            </div>
            <p className={`${FONT_STYLES.caption} mt-0.5 text-secondary-500`}>
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

        {notification.type === "project_invitation" && !notification.isRead ? (
          <button
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
          >
            <NotificationInvitationActions
              onAccept={() => onAcceptInvitation(notification.id)}
              onDecline={() => onDeclineInvitation(notification.id)}
            />
          </button>
        ) : null}
      </div>
    </button>
  );
};
