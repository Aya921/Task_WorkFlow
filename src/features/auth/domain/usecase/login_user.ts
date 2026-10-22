import type { LoginCredentials } from "../entity/login_credentials";
import type { AuthRepo } from "../repo/signup_repo";

export const createLoginUseCase =
  (authRepository: AuthRepo) => async (credentials: LoginCredentials) => {
    return authRepository.loginUser(credentials);
  };
