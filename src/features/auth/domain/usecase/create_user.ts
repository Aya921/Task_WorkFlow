import type { CreateUserStepEntity } from "../entity/crate_user_entity";
import type { SignupRepo } from "../repo/signup_repo";

export const createSignUpUseCase =
  (authRepository: SignupRepo) => async (signupEntity: CreateUserStepEntity) => {
    return authRepository.createUserStep(signupEntity);
  };
