import type { DashboardMetrics } from "./dashboard_metrics";
import type { DashboardProject } from "./dashboard_project";
import type { DashboardRecentTask } from "./dashboard_recent_task";
import type { WorkspaceMember } from "./workspace_member";

export type WorkspaceDashboard = {
  metrics: DashboardMetrics;
  projects: DashboardProject[];
  recentTasks: DashboardRecentTask[];
  members: WorkspaceMember[];
};
