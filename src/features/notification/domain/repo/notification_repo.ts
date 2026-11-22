import type { ApiResponse } from "../../../../core/api/api_type";
import type { NotificationEntity } from "../entity/notification";

export interface NotificationRepo {
  getNotifications(): Promise<ApiResponse<NotificationEntity[]>>;
  markAsRead(notificationId: string): Promise<ApiResponse<NotificationEntity>>;
  markAllAsRead(): Promise<ApiResponse<NotificationEntity[]>>;
  acceptInvitation(
    invitationId: string,
    jobTitle: string,
  ): Promise<ApiResponse<void>>;
  declineInvitation(invitationId: string): Promise<ApiResponse<void>>;
  deleteNotification(notificationId: string): Promise<ApiResponse<void>>;
}
