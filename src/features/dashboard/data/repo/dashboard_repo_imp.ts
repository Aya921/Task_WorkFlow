import type { DashboardRepo } from "../../domain/repo/dashboard_repo";
import type { DashboardDataSource } from "../dataSources/dashboard_datasource";

export const DashboardRepoImp = (
  dashboardDataSource: DashboardDataSource,
): DashboardRepo => ({
  getWorkspaceDashboard(workspaceId) {
    return dashboardDataSource.getWorkspaceDashboard(workspaceId);
  },
  addProject(request) {
    return dashboardDataSource.addProject(request);
  },
});
