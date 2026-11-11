import type { AddProjectRequest } from "../entity/add_project_request";
import type { DashboardRepo } from "../repo/dashboard_repo";

export const AddProject =
  (repo: DashboardRepo) => async (request: AddProjectRequest) => {
    return await repo.addProject(request);
  };
