import type { DashboardRepo } from "../repo/dashboard_repo";

export const deleteProjectUseCase =  (repo:DashboardRepo)=> 
    async(projectId: string)=> {
        return await repo.deleteProject(projectId);
};