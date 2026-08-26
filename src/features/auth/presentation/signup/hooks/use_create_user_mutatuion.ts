import { useMutation } from "@tanstack/react-query";
import { createUserUseCase } from "../../../../../di/auth/auth_di";
import type { CreateUserStepEntity } from "../../../domain/entity/crate_user_entity";

export const useCreateUserMutation = () => {
  const mutation=useMutation({
    mutationFn: async(entity:CreateUserStepEntity)=>{
        const response=await createUserUseCase(entity);
        if(!response.success){
            throw new Error(response.message ?? "Failed to create user Please Try again Later");
        }
        return response.data;

    }
    
  })

  return {
    createUserFn: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error?.message ?? null,
    data: mutation.data,
  };
};
