import type { LoginCredentials } from "../../domain/entity/login_credentials";
import type { LoginRequestDto } from "../dtos/login_request_dto";

export const toLoginRequestDto = (
  entity: LoginCredentials,
): LoginRequestDto => ({
  email: entity.email,
  password: entity.password,
});
