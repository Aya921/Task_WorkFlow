import type { Profile } from "../../domain/entity/profile";
import type { ProfileDto } from "../dtos/profile_dto";

export const toProfileEntity =(dto: ProfileDto): 
Profile=>({
    userName:dto.full_name,
    userEmail:dto.email,
    onboardingCompleted:dto.onboarding_completed,
    userId:dto.id,
    onboardingStep:dto.onboarding_step


})
   
  
