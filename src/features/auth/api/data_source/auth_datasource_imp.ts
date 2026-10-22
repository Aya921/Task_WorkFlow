import type { ApiResponse } from "../../../../core/api/api_type";
import type { AuthDataSource } from "../../data/dataSources/auth_datasource";
import { toCreateUserResult } from "../mappers/to_create_user_result";
import { toSignupRequestDto } from "../mappers/to_signup_request_dto";
import type { CreateUserResult } from "../../domain/entity/create_user_result";
import { AuthApiService } from "../client/auth_api_service";
import type { CreateWorkspaceRequest } from "../../domain/entity/create_work_space_request";
import type { CreateWorkspaceResponse } from "../../domain/entity/create_work_space_response";
import { CreateWorkspaceRequestDtoMapper } from "../mappers/to_create_workspace_request_dto";
import type { CreateWorkspaceResponseDto } from "../dtos/create_work_space_response_dto";
import { CreateWorkspaceResponseDtoMapper } from "../mappers/to_create_work_space_response";
import type { Profile } from "../../domain/entity/profile";
import type { UpdateOnboardingStepRequest } from "../../domain/entity/update_onboarding_step_request";
import { toProfileEntity } from "../mappers/to_profile_entity";
import { toUpdateOnboardingStepRequestDto } from "../mappers/to_update_onboarding_step_request_dto";
import type { JoinWorkspaceByInviteRequest } from "../../domain/entity/join_workspace_by_invite_request";
import { toJoinWorkspaceByInviteRequestDto } from "../mappers/to_join_workspace_by_invite_request_dto";
import type { LoginCredentials } from "../../domain/entity/login_credentials";
import type { LoginResult } from "../../domain/entity/login_result";
import { toLoginRequestDto } from "../mappers/to_login_request_dto";
import { toLoginResult } from "../mappers/to_login_result";
export const SignupDataSourceImp = (
  apiService: AuthApiService,
): AuthDataSource => ({
  async createUserStep(
    createUserEntity,
  ): Promise<ApiResponse<CreateUserResult>> {
    const { data, error } = await apiService.createUser(
      toSignupRequestDto(createUserEntity),
    );


    if (error){
      console.log("error in createUserStep", error.message);
      return {
        success: false,
        message: error.message,
      };
    }
      
    else {
      return {
        success: true,
        data: toCreateUserResult(data),
      };
    }
  },

  async loginUser(
    credentials: LoginCredentials,
  ): Promise<ApiResponse<LoginResult>> {
    const { data, error } = await apiService.loginUser(
      toLoginRequestDto(credentials),
    );

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      data: toLoginResult(data),
    };
  },

  async createWorkSpace(
    entity: CreateWorkspaceRequest,
  ): Promise<ApiResponse<CreateWorkspaceResponse>> {
    const { data, error } = await apiService.createWorkSpace(
      CreateWorkspaceRequestDtoMapper(entity),
    );

    if (error)
      return {
        success: false,
        message: error.message,
      };
    else {
      
      const response = data as CreateWorkspaceResponseDto[];
     
      const responseEntity = CreateWorkspaceResponseDtoMapper(response[0]);
      

      return {
        success: true,
        data: responseEntity,
      };
    }
  },
  async joinWorkspaceByInvite(
    entity: JoinWorkspaceByInviteRequest,
  ): Promise<ApiResponse<boolean>> {
    const { data, error } = await apiService.joinWorkspaceByInvite(
      toJoinWorkspaceByInviteRequestDto(entity),
    );

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      data,
    };
  },
  async getProfileData(userId: string): Promise<ApiResponse<Profile>> {
  const { data, error } = await apiService.getProfileData(userId);

  

 

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }
 

  return {
    success: true,
    data: toProfileEntity(data),
  };
},
  async updateOnboardingStep(
    entity: UpdateOnboardingStepRequest,
  ): Promise<ApiResponse<Profile>> {
    const { data, error } = await apiService.updateOnboardingStep(
      toUpdateOnboardingStepRequestDto(entity),
    );

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      data: toProfileEntity(data),
    };
  },
});
