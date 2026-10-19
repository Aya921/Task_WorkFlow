import type { CreateUserResult } from "../../domain/entity/create_user_result";
import type { AuthResponse } from "@supabase/supabase-js";

export const toCreateUserResult = (dto: AuthResponse["data"]): CreateUserResult => ({
  userId: dto.user?.id ?? "",
  email: dto?.user?.email ?? "",
});
