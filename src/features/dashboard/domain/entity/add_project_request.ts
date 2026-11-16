export type AddProjectRequest = {
  workspaceId: string;
  name: string;
  description?: string | null;
  color?: string | null;
  /** Workspace member user ids to invite into the project. */
  memberIds: string[];
};
