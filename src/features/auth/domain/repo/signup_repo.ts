import type { ApiResponse } from "../../../../core/api/api_type";
import type { CreateUserStepEntity } from "../entity/crate_user_entity";
import type { CreateUserResult } from "../entity/create_user_result";
import type { CreateWorkspaceRequest } from "../entity/create_work_space_request";
import type { CreateWorkspaceResponse } from "../entity/create_work_space_response";
import type { Profile } from "../entity/profile";
import type { UpdateOnboardingStepRequest } from "../entity/update_onboarding_step_request";
import type { JoinWorkspaceByInviteRequest } from "../entity/join_workspace_by_invite_request";

export interface AuthRepo {
  createUserStep(createUserEntity: CreateUserStepEntity): Promise<ApiResponse<CreateUserResult>>;
  createWorkSpace(entity:CreateWorkspaceRequest):Promise<ApiResponse<CreateWorkspaceResponse>>
  joinWorkspaceByInvite(entity: JoinWorkspaceByInviteRequest): Promise<ApiResponse<boolean>>;
  getProfileData(userId:string):Promise<ApiResponse<Profile>>
  updateOnboardingStep(entity: UpdateOnboardingStepRequest): Promise<ApiResponse<Profile>>;
}
