import type { CreateWorkspaceResponse } from "../../domain/entity/create_work_space_response";
import type { CreateWorkspaceResponseDto } from "../dtos/create_work_space_response_dto";

export const CreateWorkspaceResponseDtoMapper =(dto: CreateWorkspaceResponseDto): 
CreateWorkspaceResponse=>({
    workSpace_id:dto.workspace_id,
    name:dto.workspace_name,
    expiredAt:dto.expires_at,
    inviteCode:dto.invite_code


})
   
  
