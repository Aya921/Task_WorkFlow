import type { CreateWorkspaceRequest } from "../entity/create_work_space_request";
import type { SignupRepo } from "../repo/signup_repo";

export const CreateWorkSpace =
  (repo: SignupRepo) => async (entity: CreateWorkspaceRequest) => {
    return await repo.createWorkSpace(entity);
  };
