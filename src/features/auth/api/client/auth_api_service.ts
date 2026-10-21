import { supabase } from "../../../../core/supabase/supabase_client";
import type { CreateWorkspaceRequestDto } from "../dtos/create_work_space_request_dto";
import type { SignupRequestDto } from "../dtos/signup_request_dto";
import type { UpdateOnboardingStepRequestDto } from "../dtos/update_onboarding_step_request_dto";
import type { JoinWorkspaceByInviteRequestDto } from "../dtos/join_workspace_by_invite_request_dto";

export class AuthApiService {
  async createUser(dto: SignupRequestDto) {
    const response = await supabase.auth.signUp({
      email: dto.email,
      password: dto.password,
      options: {
        data: {
          full_name: dto.full_name,
          
        },
        emailRedirectTo: "http://localhost:5173/signup/verification",
      },
    });

    return response;
  }

  async createWorkSpace(dto: CreateWorkspaceRequestDto) {
    const response = await supabase.rpc("create_workspace", {
      p_name: dto.name,
      p_created_by: dto.created_by,
    });

    return response;
  }

  async joinWorkspaceByInvite(dto: JoinWorkspaceByInviteRequestDto) {
    const response = await supabase.rpc("join_workspace_by_invite", {
      p_code: dto.code,
    });

    return response;
  }

  async getProfileData(userId: string) {
    const response = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    return response;
  }

    async updateOnboardingStep(dto: UpdateOnboardingStepRequestDto) {
      const updateData: {
        onboarding_step: string;
        onboarding_completed?: boolean;
      } = {
        onboarding_step: dto.onboarding_step,
      };

      if (dto.onboarding_completed !== undefined) {
        updateData.onboarding_completed = dto.onboarding_completed;
      }
     

      const response = await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", dto.id)
        .select("*")
        .maybeSingle();
        console.log("the response from onboarding step fn is : ",response)


      return response;
    }
  }
