export type AddProjectRequest = {
  workspaceId: string;
  name: string;
  description?: string | null;
  color?: string | null;
  memberIds: string[];
  invitationExpiresInHours?: number | null;
  inviteExternalMembers?:string[]

};
