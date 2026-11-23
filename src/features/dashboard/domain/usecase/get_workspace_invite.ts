import type { DashboardRepo } from "../repo/dashboard_repo";

export const GetWorkspaceInvite =
  (repo: DashboardRepo) => async (workspaceId: string) => {
    return await repo.getWorkspaceInvite(workspaceId);
  };
