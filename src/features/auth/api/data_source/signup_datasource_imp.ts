import type { ApiResponse } from "../../../../core/api/api_type";
import type { SignupDataSource } from "../../data/dataSources/signup_datasource";
import { toCreateUserResult } from "../mappers/to_create_user_result";
import { toSignupRequestDto } from "../mappers/to_signup_request_dto";
import type { CreateUserResult } from "../../domain/entity/create_user_result";
import { SignupApiService } from "../client/signup_api_service";
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
        success:true,
        data: toCreateUserResult(data)
      };
    }
  },
});
