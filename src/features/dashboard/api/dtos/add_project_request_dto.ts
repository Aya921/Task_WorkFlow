export type AddProjectRequestDto = {
  p_workspace_id: string;
  p_name: string;
  p_description?: string | null;
  p_color?: string | null;
};
