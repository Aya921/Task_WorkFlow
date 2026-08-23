import type { ApiResponse } from "../../../../core/api/api_type";
import type { CreateUserStepEntity } from "../../domain/entity/crate_user_entity";
import type { CreateUserResult } from "../../domain/entity/create_user_result";

export interface SignupDataSource {
      createUserStep(createUserEntity: CreateUserStepEntity): Promise<ApiResponse<CreateUserResult>>;
    
}