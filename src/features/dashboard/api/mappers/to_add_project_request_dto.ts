import type { AddProjectRequest } from "../../domain/entity/add_project_request";
import type { AddProjectRequestDto } from "../dtos/add_project_request_dto";

export const toAddProjectRequestDto = (
  entity: AddProjectRequest,
): AddProjectRequestDto => ({
  p_workspace_id: entity.workspaceId,
  p_name: entity.name,
  p_description: entity.description ?? null,
  p_color: entity.color ?? null,
});
