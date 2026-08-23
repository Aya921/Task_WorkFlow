import type { ApiResponse } from "../../../../core/api/api_type";
import type { CreateUserStepEntity } from "../entity/crate_user_entity";
import type { CreateUserResult } from "../entity/create_user_result";

export interface SignupRepo {
  createUserStep(createUserEntity: CreateUserStepEntity): Promise<ApiResponse<CreateUserResult>>;
}
