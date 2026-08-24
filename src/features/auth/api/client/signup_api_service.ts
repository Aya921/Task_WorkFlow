import { supabase } from "../../../../core/supabase/supabase_client";
import type { CreateWorkspaceRequestDto } from "../dtos/create_work_space_request_dto";
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

  
  async createWorkSpace(dto: CreateWorkspaceRequestDto) {
    const response = await supabase.rpc("create_workspace",{
      p_name:dto.name,
      p_created_by:dto.created_by
    })
    
    return response
  }



}
