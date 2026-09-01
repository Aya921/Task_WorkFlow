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
import { toProfileEntity } from "../mappers/to_profile_entity";
export const SignupDataSourceImp = (
  apiService: AuthApiService,
): AuthDataSource => ({
  async createUserStep(
    createUserEntity,
  ): Promise<ApiResponse<CreateUserResult>> {
    const { data, error } = await apiService.createUser(
      toSignupRequestDto(createUserEntity),
    );


    if (error)
      return {
        success: false,
        message: error.message,
      };
    else {
      return {
        success: true,
        data: toCreateUserResult(data),
      };
    }
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
});
