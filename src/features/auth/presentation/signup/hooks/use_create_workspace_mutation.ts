import { useMutation } from "@tanstack/react-query";
import {  createWorkSpaceUseCase } from "../../../../../di/auth/auth_di";

import type { CreateWorkspaceRequest } from "../../../domain/entity/create_work_space_request";

export const useCreateWorkSpaceMutation = () => {
  const mutation=useMutation({
    mutationFn: async(entity:CreateWorkspaceRequest)=>{
        const response=await createWorkSpaceUseCase(entity);
        if(!response.success){
            throw new Error(response.message ?? "Failed to create workSpace Please Try again Later");
        }
       
        return response.data;

    }
    
  })

  return {
    createWorkSpaceFn: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error?.message ?? null,
    data: mutation.data,
  };
};
