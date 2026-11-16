import type { DashboardMember } from "../../domain/entity/dashboard_members";
import type { DashboardProject } from "../../domain/entity/dashboard_project";
import type {
  DashboardProjectDto,
  DashboardProjectMemberDto,
} from "../dtos/dashboard_project_dto";

const toDashboardProjectMember = (
  dto: DashboardProjectMemberDto,
): DashboardMember => ({
  id: dto.id,
  fullName: dto.fullName,
});

export const toDashboardProject = (
  dto: DashboardProjectDto,
): DashboardProject => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  color: dto.color,
  status: dto.status,
  progress: dto.progress,
  totalTasks: dto.totalTasks,
  completedTasks: dto.completedTasks,
  membersCount: dto.membersCount,
  members: (dto.members ?? []).map(toDashboardProjectMember),
  lastTaskUpdatedAt: dto.lastTaskUpdatedAt ?? null,
});
