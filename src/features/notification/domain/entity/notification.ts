import type { NotificationData } from "./notification_data";
import type { NotificationType } from "./notification_type";

export type NotificationEntity = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  data: NotificationData;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
};
