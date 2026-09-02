import type { ApiResponse } from "../../../../core/api/api_type";
import type { Profile } from "../../domain/entity/profile";
import type { UpdateOnboardingStepRequest } from "../../domain/entity/update_onboarding_step_request";
import type { AuthRepo } from "../../domain/repo/signup_repo";
import type { AuthDataSource } from "../dataSources/auth_datasource";

export const AuthRepoImp=(
    authDataSource:AuthDataSource
): AuthRepo=>({
    createUserStep(signupEntity) {
        return authDataSource.createUserStep(signupEntity);
    },



    createWorkSpace(createWorkSpaceEntity) {
        return authDataSource.createWorkSpace(createWorkSpaceEntity);
    },
    getProfileData (userId: string): Promise<ApiResponse<Profile>> {
       return authDataSource.getProfileData(userId)
    },
    updateOnboardingStep(entity: UpdateOnboardingStepRequest): Promise<ApiResponse<Profile>> {
        return authDataSource.updateOnboardingStep(entity);
    }
})