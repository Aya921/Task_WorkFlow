export type DashboardProjectMemberDto = {
  id: string;
  fullName: string;
};

export type DashboardProjectDto = {
  id: string;
  name: string;
  description: string | null;
  color: string | null;
  status: string;
  progress: number;
  totalTasks: number;
  completedTasks: number;
  membersCount: number;
  members: DashboardProjectMemberDto[];
  lastTaskUpdatedAt: string | null;
};
