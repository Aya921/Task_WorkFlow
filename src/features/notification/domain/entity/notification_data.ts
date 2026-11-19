export type NotificationData = {
  invitationId?: string;
  projectId?: string;
  workspaceId?: string;
  inviterId?: string;
  taskId?: string;
  inviterName?: string;
  projectName?: string;
  workspaceName?: string;
  [key: string]: unknown;
};
