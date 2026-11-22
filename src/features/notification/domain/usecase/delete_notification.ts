import type { NotificationRepo } from "../repo/notification_repo";

export const DeleteNotification =
  (repo: NotificationRepo) => async (notificationId: string) => {
    return await repo.deleteNotification(notificationId);
  };
