import type { DashboardRepo } from "../repo/dashboard_repo";

export const RegenerateWorkspaceInvite =
  (repo: DashboardRepo) => async (workspaceId: string) => {
    return await repo.regenerateWorkspaceInvite(workspaceId);
  };
