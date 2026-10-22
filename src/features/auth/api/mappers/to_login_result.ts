import type { AuthResponse } from "@supabase/supabase-js";
import type { LoginResult } from "../../domain/entity/login_result";

export const toLoginResult = (dto: AuthResponse["data"]): LoginResult => ({
  userId: dto.user?.id ?? "",
  email: dto.user?.email ?? "",
});
