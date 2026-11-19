export type AddProjectRequest = {
  workspaceId: string;
  name: string;
  description?: string | null;
  color?: string | null;
  /** Workspace member user ids to invite into the project. */
  memberIds: string[];
  /** Invitation lifetime in hours (e.g. 24). Backend computes the expiry; defaults to 7 days when omitted. */
  invitationExpiresInHours?: number | null;
};
