export type AddProjectRequest = {
  workspaceId: string;
  name: string;
  description?: string | null;
  color?: string | null;
};
