import { SignupApiService } from "../../features/auth/api/client/signup_api_service";
import { SignupDataSourceImp } from "../../features/auth/api/data_source/signup_datasource_imp";
import { SignupRepoImp } from "../../features/auth/data/repo/signup_repo_imp";
import { createSignUpUseCase } from "../../features/auth/domain/usecase/create_user";


const signupApiService = new SignupApiService();

const signupDataSource =
  SignupDataSourceImp(signupApiService);

const signupRepo =
  SignupRepoImp(signupDataSource);

export const createUserUseCase =
  createSignUpUseCase(signupRepo);