import type { UpdateOnboardingStepRequest } from "../entity/update_onboarding_step_request";
import type { AuthRepo } from "../repo/signup_repo";

export const UpdateOnboardingStep =
  (repo: AuthRepo) => async (entity: UpdateOnboardingStepRequest) => {
    return await repo.updateOnboardingStep(entity);
  };
