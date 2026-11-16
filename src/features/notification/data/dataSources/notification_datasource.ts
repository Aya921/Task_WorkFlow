import type { ApiResponse } from "../../../../core/api/api_type";
import type { Notification } from "../../domain/entity/notification";

export interface NotificationDataSource {
  getNotifications(): Promise<ApiResponse<Notification[]>>;
  markAsRead(notificationId: string): Promise<ApiResponse<Notification>>;
  markAllAsRead(): Promise<ApiResponse<Notification[]>>;
}
