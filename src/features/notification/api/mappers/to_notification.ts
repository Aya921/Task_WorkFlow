import type { Notification } from "../../domain/entity/notification";
import type { NotificationData } from "../../domain/entity/notification_data";
import type { NotificationDto } from "../dtos/notification_dto";

const toNotificationData = (
  data: Record<string, unknown> | null,
): NotificationData => {
  if (!data) {
    return {};
  }

  return {
    invitationId:
      typeof data.invitation_id === "string" ? data.invitation_id : undefined,
    projectId: typeof data.project_id === "string" ? data.project_id : undefined,
    workspaceId:
      typeof data.workspace_id === "string" ? data.workspace_id : undefined,
    inviterId: typeof data.inviter_id === "string" ? data.inviter_id : undefined,
    taskId: typeof data.task_id === "string" ? data.task_id : undefined,
  };
};

export const toNotification = (dto: NotificationDto): Notification => ({
  id: dto.id,
  type: dto.type,
  title: dto.title,
  message: dto.message,
  data: toNotificationData(dto.data),
  isRead: dto.is_read,
  readAt: dto.read_at,
  createdAt: dto.created_at,
});
