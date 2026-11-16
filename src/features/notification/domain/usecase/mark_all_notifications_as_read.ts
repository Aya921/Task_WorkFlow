import type { NotificationRepo } from "../repo/notification_repo";

export const MarkAllNotificationsAsRead =
  (repo: NotificationRepo) => async () => {
    return await repo.markAllAsRead();
  };
