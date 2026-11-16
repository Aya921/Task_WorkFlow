import type { NotificationRepo } from "../../domain/repo/notification_repo";
import type { NotificationDataSource } from "../dataSources/notification_datasource";

export const NotificationRepoImp = (
  dataSource: NotificationDataSource,
): NotificationRepo => ({
  getNotifications() {
    return dataSource.getNotifications();
  },
  markAsRead(notificationId) {
    return dataSource.markAsRead(notificationId);
  },
  markAllAsRead() {
    return dataSource.markAllAsRead();
  },
});
