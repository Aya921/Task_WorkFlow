import type { ApiResponse } from "../../../../core/api/api_type";
import type { CreateUserStepEntity } from "../../domain/entity/crate_user_entity";
import type { CreateUserResult } from "../../domain/entity/create_user_result";
import type { CreateWorkspaceRequest } from "../../domain/entity/create_work_space_request";
import type { CreateWorkspaceResponse } from "../../domain/entity/create_work_space_response";
import type { LoginCredentials } from "../../domain/entity/login_credentials";
import type { LoginResult } from "../../domain/entity/login_result";
import type { Profile } from "../../domain/entity/profile";
import type { UpdateOnboardingStepRequest } from "../../domain/entity/update_onboarding_step_request";
import type { JoinWorkspaceByInviteRequest } from "../../domain/entity/join_workspace_by_invite_request";

export interface AuthDataSource {
  createUserStep(
    createUserEntity: CreateUserStepEntity,
  ): Promise<ApiResponse<CreateUserResult>>;
  loginUser(
    credentials: LoginCredentials,
  ): Promise<ApiResponse<LoginResult>>;
  createWorkSpace(
    entity: CreateWorkspaceRequest,
  ): Promise<ApiResponse<CreateWorkspaceResponse>>;
  joinWorkspaceByInvite(
    entity: JoinWorkspaceByInviteRequest,
  ): Promise<ApiResponse<boolean>>;

  getProfileData(userId:string):Promise<ApiResponse<Profile>>
  updateOnboardingStep(entity: UpdateOnboardingStepRequest): Promise<ApiResponse<Profile>>;
}
