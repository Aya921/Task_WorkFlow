import type { CreateUserStepEntity } from "../entity/crate_user_entity";
import type { AuthRepo } from "../repo/signup_repo";

export const createSignUpUseCase =
  (authRepository: AuthRepo) => async (signupEntity: CreateUserStepEntity) => {
    return authRepository.createUserStep(signupEntity);
  };
