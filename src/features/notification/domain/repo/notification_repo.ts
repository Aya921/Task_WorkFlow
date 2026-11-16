import type { ApiResponse } from "../../../../core/api/api_type";
import type { Notification } from "../entity/notification";

export interface NotificationRepo {
  getNotifications(): Promise<ApiResponse<Notification[]>>;
  markAsRead(notificationId: string): Promise<ApiResponse<Notification>>;
  markAllAsRead(): Promise<ApiResponse<Notification[]>>;
}
