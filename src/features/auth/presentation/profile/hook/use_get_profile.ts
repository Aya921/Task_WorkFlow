import { useQuery } from "@tanstack/react-query";
import { getProfileUseCase } from "../../../../../di/auth/auth_di";

export function useProfile(userId: string | undefined) {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {

        const response =await getProfileUseCase(userId!)
       if (!response.success) throw new Error(response.message);
       else return response.data

    },
    enabled: !!userId, 
    
  });
}