import type { NotificationGroup } from "../utils/group_notifications";
import { NotificationsGroup } from "./notifications_group";

type NotificationsListProps = {
  groups: NotificationGroup[];
};

export const NotificationsList = ({ groups }: NotificationsListProps) => {
  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      {groups.map((group) => (
        <NotificationsGroup
          key={group.key}
          groupKey={group.key}
          items={group.items}
        />
      ))}
    </div>
  );
};
