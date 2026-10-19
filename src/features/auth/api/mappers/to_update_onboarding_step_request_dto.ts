import type { UpdateOnboardingStepRequest } from "../../domain/entity/update_onboarding_step_request";
import type { UpdateOnboardingStepRequestDto } from "../dtos/update_onboarding_step_request_dto";

export const toUpdateOnboardingStepRequestDto = (
  entity: UpdateOnboardingStepRequest,
): UpdateOnboardingStepRequestDto => ({
  id: entity.userId,
  onboarding_step: entity.onboardingStep,
  onboarding_completed: entity.onboardingCompleted,
});
