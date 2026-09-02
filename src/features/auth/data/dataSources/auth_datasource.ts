import type { ApiResponse } from "../../../../core/api/api_type";
import type { CreateUserStepEntity } from "../../domain/entity/crate_user_entity";
import type { CreateUserResult } from "../../domain/entity/create_user_result";
import type { CreateWorkspaceRequest } from "../../domain/entity/create_work_space_request";
import type { CreateWorkspaceResponse } from "../../domain/entity/create_work_space_response";
import type { Profile } from "../../domain/entity/profile";
import type { UpdateOnboardingStepRequest } from "../../domain/entity/update_onboarding_step_request";

export interface AuthDataSource {
  createUserStep(
    createUserEntity: CreateUserStepEntity,
  ): Promise<ApiResponse<CreateUserResult>>;
  createWorkSpace(
    entity: CreateWorkspaceRequest,
  ): Promise<ApiResponse<CreateWorkspaceResponse>>;

  getProfileData(userId:string):Promise<ApiResponse<Profile>>
  updateOnboardingStep(entity: UpdateOnboardingStepRequest): Promise<ApiResponse<Profile>>;
}
