import type { ApiResponse } from "../../../../core/api/api_type";
import type { NotificationEntity } from "../../domain/entity/notification";

export interface NotificationDataSource {
  getNotifications(): Promise<ApiResponse<NotificationEntity[]>>;
  markAsRead(notificationId: string): Promise<ApiResponse<NotificationEntity>>;
  markAllAsRead(): Promise<ApiResponse<NotificationEntity[]>>;
  acceptInvitation(
    invitationId: string,
    jobTitle: string,
  ): Promise<ApiResponse<void>>;
  declineInvitation(invitationId: string): Promise<ApiResponse<void>>;
}
