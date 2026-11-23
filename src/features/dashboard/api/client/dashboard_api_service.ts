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
      p_member_ids: dto.p_member_ids,
      p_invitation_expires_in_hours: dto.p_invitation_expires_in_hours ,
      p_invite_emails:dto.p_invite_external_members
    });
  }

  async deleteProject(projectId: string) {
    return await supabase.rpc("delete_project", {
      p_project_id: projectId,
    });
  }

  async getWorkspaceInvite(workspaceId: string) {
    return await supabase.rpc("get_workspace_invite", {
      p_workspace_id: workspaceId,
    });
  }

  async regenerateWorkspaceInvite(workspaceId: string) {
    return await supabase.rpc("regenerate_workspace_invite", {
      p_workspace_id: workspaceId,
    });
  }
}
