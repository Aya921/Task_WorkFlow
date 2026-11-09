import { supabase } from "../../../../core/supabase/supabase_client";

export class DashboardApiService {
  async getWorkspaceDashboard(workspaceId: string) {
    return await supabase.rpc("get_workspace_dashboard", {
      p_workspace_id: workspaceId,
    });
  }
}
