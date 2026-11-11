import type { AddProjectResult } from "../../domain/entity/add_project_result";
import type { AddProjectResponseDto } from "../dtos/add_project_response_dto";

export const toAddProjectResult = (
  dto: AddProjectResponseDto,
): AddProjectResult => ({
  id: dto.id,
  workspaceId: dto.workspace_id,
  name: dto.name,
  description: dto.description,
  color: dto.color,
  status: dto.status,
  createdBy: dto.created_by,
  createdAt: dto.created_at,
  updatedAt: dto.updated_at,
});
