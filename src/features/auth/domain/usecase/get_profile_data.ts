import type { AuthRepo } from "../repo/signup_repo";

export const GetProfileDataUseCase =
  (authRepository: AuthRepo) => async (userId: string) => {
    return authRepository.getProfileData(userId);
  };
