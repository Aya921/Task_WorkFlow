export type AddProjectResponseDto = {
  id: string;
  workspace_id: string;
  name: string;
  description: string | null;
  color: string | null;
  status: string;
  created_by: string;
  created_at: string;
  updated_at: string;
};
