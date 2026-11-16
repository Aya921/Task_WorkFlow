import type { NotificationRepo } from "../repo/notification_repo";

export const GetNotifications = (repo: NotificationRepo) => async () => {
  return await repo.getNotifications();
};
