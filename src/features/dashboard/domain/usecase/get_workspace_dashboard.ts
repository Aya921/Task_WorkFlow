import type { DashboardRepo } from "../repo/dashboard_repo";

export const GetWorkspaceDashboard =
  (repo: DashboardRepo) => async (workspaceId: string) => {
    return await repo.getWorkspaceDashboard(workspaceId);
  };
