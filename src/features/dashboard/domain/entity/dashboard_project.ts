import type { DashboardMember } from "./dashboard_members";
export type DashboardProject = {
  id: string;
  name: string;
  description: string | null;
  color: string | null;
  status: string;
  progress: number;
  totalTasks: number;
  completedTasks: number;
  membersCount: number;
  members: DashboardMember[];
  lastTaskUpdatedAt: string | null;
};
