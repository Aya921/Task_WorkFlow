import type { AuthRepo } from "../repo/signup_repo";

export const GetProfileWithRole =
  (authRepository: AuthRepo) => async (userId: string) => {
    return authRepository.getProfileWithRole(userId);
  };
