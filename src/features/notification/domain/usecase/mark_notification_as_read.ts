import type { NotificationRepo } from "../repo/notification_repo";

export const MarkNotificationAsRead =
  (repo: NotificationRepo) => async (notificationId: string) => {
    return await repo.markAsRead(notificationId);
  };
