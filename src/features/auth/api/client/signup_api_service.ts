import { supabase } from "../../../../core/supabase/supabase_client";
import type { SignupRequestDto } from "../dtos/signup_request_dto";

export class SignupApiService {
  async createUser(dto: SignupRequestDto) {
    const response = await supabase.auth.signUp({
      email: dto.email,
      password: dto.password,
      options: {
        data: {
          full_name: dto.full_name,
        },
      },
    });
    return response
  }
}
