import type { CreateWorkspaceRequest } from "../entity/create_work_space_request";
import type { AuthRepo } from "../repo/signup_repo";

export const CreateWorkSpace =
  (repo: AuthRepo) => async (entity: CreateWorkspaceRequest) => {
    return await repo.createWorkSpace(entity);
  };
