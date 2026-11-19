import type { NotificationEntity } from "../../domain/entity/notification";
import type { NotificationData } from "../../domain/entity/notification_data";
import type { NotificationDto } from "../dtos/notification_dto";

const readOptionalString = (value: unknown) =>
  typeof value === "string" ? value : undefined;

const toNotificationData = (
  data: Record<string, unknown> | null,
): NotificationData => {
  if (!data) {
    return {};
  }

  return {
    invitationId: readOptionalString(data.invitation_id),
    projectId: readOptionalString(data.project_id),
    workspaceId: readOptionalString(data.workspace_id),
    inviterId: readOptionalString(data.inviter_id),
    taskId: readOptionalString(data.task_id),
    inviterName: readOptionalString(data.inviter_name),
    projectName: readOptionalString(data.project_name),
    workspaceName: readOptionalString(data.workspace_name),
  };
};

export const toNotification = (dto: NotificationDto): NotificationEntity => ({
  id: dto.id,
  type: dto.type,
  title: dto.title,
  message: dto.message,
  data: toNotificationData(dto.data),
  isRead: dto.is_read,
  readAt: dto.read_at,
  createdAt: dto.created_at,
});
