import type { NotificationGroup } from "../utils/group_notifications";
import { NotificationsGroup } from "./notifications_group";

type NotificationsListProps = {
  groups: NotificationGroup[];
  onMarkAsRead: (id: string) => void;
  onAcceptInvitation: (id: string) => void;
  onDeclineInvitation: (id: string) => void;
};

export const NotificationsList = ({
  groups,
  onMarkAsRead,
  onAcceptInvitation,
  onDeclineInvitation,
}: NotificationsListProps) => {
  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      {groups.map((group) => (
        <NotificationsGroup
          key={group.key}
          groupKey={group.key}
          items={group.items}
          onMarkAsRead={onMarkAsRead}
          onAcceptInvitation={onAcceptInvitation}
          onDeclineInvitation={onDeclineInvitation}
        />
      ))}
    </div>
  );
};
