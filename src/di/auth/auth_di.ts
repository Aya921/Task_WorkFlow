import { AuthApiService } from "../../features/auth/api/client/auth_api_service";
import { SignupDataSourceImp } from "../../features/auth/api/data_source/auth_datasource_imp";
import { AuthRepoImp } from "../../features/auth/data/repo/auth_repo_imp";
import { createSignUpUseCase } from "../../features/auth/domain/usecase/create_user";
import { createLoginUseCase } from "../../features/auth/domain/usecase/login_user";
import { CreateWorkSpace } from "../../features/auth/domain/usecase/create_work_space";
import { GetProfileDataUseCase } from "../../features/auth/domain/usecase/get_profile_data";
import { UpdateOnboardingStep } from "../../features/auth/domain/usecase/update_onboarding_step";
import { JoinWorkspaceByInvite } from "../../features/auth/domain/usecase/join_workspace_by_invite";


const authApiService = new AuthApiService();

const authDataSource =
  SignupDataSourceImp(authApiService);

const authRepo =
  AuthRepoImp(authDataSource);

export const createUserUseCase =
  createSignUpUseCase(authRepo);
export const loginUserUseCase =
  createLoginUseCase(authRepo);
export const createWorkSpaceUseCase =
  CreateWorkSpace(authRepo);

  export const getProfileUseCase=GetProfileDataUseCase(authRepo)

  export const updateOnboardingStepUseCase = UpdateOnboardingStep(authRepo);
  export const joinWorkspaceByInviteUseCase = JoinWorkspaceByInvite(authRepo);