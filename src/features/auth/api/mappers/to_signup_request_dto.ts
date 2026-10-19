// signup_mapper.ts

import type { CreateUserStepEntity } from "../../domain/entity/crate_user_entity";
import type { SignupRequestDto } from "../dtos/signup_request_dto";

export const toSignupRequestDto = (
  entity: CreateUserStepEntity
): SignupRequestDto => ({
  email: entity.email,
  password: entity.password,
  full_name: entity.fullName,
});