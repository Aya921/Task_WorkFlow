export const NOTIFICATION_TYPES = [
  "project_invitation",
  "task_assigned",
  "task_updated",
  "task_completed",
  "task_due_soon",
  "project_updated",
  "member_joined",
  "member_removed",
] as const;

export type NotificationType = (typeof NOTIFICATION_TYPES)[number];
