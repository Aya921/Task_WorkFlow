export type NotificationData = {
  invitationId?: string;
  projectId?: string;
  workspaceId?: string;
  inviterId?: string;
  taskId?: string;
  inviterName?: string;
  projectName?: string;
  workspaceName?: string;
  /** ISO timestamp after which the invitation can no longer be accepted. */
  expiresAt?: string;
  [key: string]: unknown;
};
