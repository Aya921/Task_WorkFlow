-- job_title belongs on membership, not on the invitation itself.

ALTER TABLE public.project_invitations
  DROP CONSTRAINT IF EXISTS project_invitations_job_title_when_accepted;

ALTER TABLE public.project_invitations
  DROP COLUMN IF EXISTS job_title;

ALTER TABLE public.project_members
  ADD COLUMN job_title text;

ALTER TABLE public.project_members
  ADD CONSTRAINT project_members_job_title_not_empty CHECK (
    job_title IS NULL
    OR char_length(TRIM(BOTH FROM job_title)) > 0
  );
