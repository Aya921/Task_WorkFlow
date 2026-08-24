import type { ApiResponse } from "../../../../core/api/api_type";
import type { SignupDataSource } from "../../data/dataSources/signup_datasource";
import { toCreateUserResult } from "../mappers/to_create_user_result";
import { toSignupRequestDto } from "../mappers/to_signup_request_dto";
import type { CreateUserResult } from "../../domain/entity/create_user_result";
import { SignupApiService } from "../client/signup_api_service";
import type { CreateWorkspaceRequest } from "../../domain/entity/create_work_space_request";
import type { CreateWorkspaceResponse } from "../../domain/entity/create_work_space_response";
import { CreateWorkspaceRequestDtoMapper } from "../mappers/to_create_workspace_request_dto";
import type { CreateWorkspaceResponseDto } from "../dtos/create_work_space_response_dto";
import { CreateWorkspaceResponseDtoMapper } from "../mappers/to_create_work_space_response";
export const SignupDataSourceImp = (
  apiService: SignupApiService,
): SignupDataSource => ({
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
    console.log("Created By:", entity.created_by);
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
      const responseEntity= CreateWorkspaceResponseDtoMapper(response[0])
       
      return {
        success: true,
        data: responseEntity,
      };
    }
  },
});
