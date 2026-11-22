import type { NotificationType } from "../../domain/entity/notification_type";

export type NotificationDto = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  data: Record<string, unknown> | null;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
};
