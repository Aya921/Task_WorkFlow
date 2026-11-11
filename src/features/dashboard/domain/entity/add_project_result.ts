export type AddProjectResult = {
  id: string;
  workspaceId: string;
  name: string;
  description: string | null;
  color: string | null;
  status: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};
