import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../assets/fonts/font_style";
import type { Notification } from "../../domain/entity/notification";
import type { NotificationGroupKey } from "../utils/group_notifications";
import { NotificationItem } from "./notification_item";

type NotificationsGroupProps = {
  groupKey: NotificationGroupKey;
  items: Notification[];
  onMarkAsRead: (id: string) => void;
  onAcceptInvitation: (id: string) => void;
  onDeclineInvitation: (id: string) => void;
};

export const NotificationsGroup = ({
  groupKey,
  items,
  onMarkAsRead,
  onAcceptInvitation,
  onDeclineInvitation,
}: NotificationsGroupProps) => {
  const { t } = useTranslation("notification");

  return (
    <section className="flex flex-col gap-2.5">
      <h2 className={`${FONT_STYLES.overline} text-secondary-400`}>
        {t(`groups.${groupKey}`)}
      </h2>
      <div className="flex flex-col gap-2">
        {items.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onMarkAsRead={onMarkAsRead}
            onAcceptInvitation={onAcceptInvitation}
            onDeclineInvitation={onDeclineInvitation}
          />
        ))}
      </div>
    </section>
  );
};
