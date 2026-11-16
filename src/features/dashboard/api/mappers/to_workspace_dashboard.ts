import type { WorkspaceDashboard } from "../../domain/entity/workspace_dashboard";
import type { WorkspaceDashboardDto } from "../dtos/workspace_dashboard_dto";
import { toDashboardMetrics } from "./to_dashboard_metrics";
import { toDashboardProject } from "./to_dashboard_project";
import { toDashboardRecentTask } from "./to_dashboard_recent_task";
import { toWorkspaceMember } from "./to_workspace_member";

export const toWorkspaceDashboard = (
  dto: WorkspaceDashboardDto,
): WorkspaceDashboard => ({
  metrics: toDashboardMetrics(dto.metrics),
  projects: (dto.projects ?? []).map(toDashboardProject),
  recentTasks: (dto.recentTasks ?? []).map(toDashboardRecentTask),
  members: (dto.members ?? []).map(toWorkspaceMember),
});
