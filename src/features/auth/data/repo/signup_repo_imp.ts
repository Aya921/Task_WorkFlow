import type { SignupRepo } from "../../domain/repo/signup_repo";
import type { SignupDataSource } from "../dataSources/signup_datasource";

export const SignupRepoImp=(
    signupDataSource:SignupDataSource
): SignupRepo=>({
    createUserStep(signupEntity){
        return signupDataSource.createUserStep(signupEntity)
    }
})