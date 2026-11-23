export type WorkspaceInviteDto = {
  invite_code: string | null;
  expires_at: string | null;
  is_expired: boolean;
};
