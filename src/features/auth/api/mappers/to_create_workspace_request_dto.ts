import type { CreateWorkspaceRequest } from "../../domain/entity/create_work_space_request";
import type { CreateWorkspaceRequestDto } from "../dtos/create_work_space_request_dto";

export const CreateWorkspaceRequestDtoMapper =(entity: CreateWorkspaceRequest): 
CreateWorkspaceRequestDto=>({
    name:entity.name,
    created_by:entity.created_by

})
   
  
