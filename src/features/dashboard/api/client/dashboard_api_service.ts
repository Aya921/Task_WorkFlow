import { supabase } from "../../../../core/supabase/supabase_client";
import type { AddProjectRequestDto } from "../dtos/add_project_request_dto";

export class DashboardApiService {
  async getWorkspaceDashboard(workspaceId: string) {
    return await supabase.rpc("get_workspace_dashboard", {
      p_workspace_id: workspaceId,
    });
  }

  async addProject(dto: AddProjectRequestDto) {
    return await supabase.rpc("create_project", {
      p_workspace_id: dto.p_workspace_id,
      p_name: dto.p_name,
      p_description: dto.p_description,
      p_color: dto.p_color,
    });
  }
}
