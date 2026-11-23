import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useRegenerateWorkspaceInviteMutation,
  useWorkspaceInviteQuery,
} from "../../hooks/use_workspace_invite";
import { WorkspaceInviteCodeCard } from "./workspace_invite_code_card";
import { WorkspaceInviteError } from "./workspace_invite_error";
import { WorkspaceInviteExpiredBanner } from "./workspace_invite_expired_banner";
import { WorkspaceInviteFooter } from "./workspace_invite_footer";
import { WorkspaceInviteHeader } from "./workspace_invite_header";
import { WorkspaceInviteLoading } from "./workspace_invite_loading";

type WorkspaceInviteModalProps = {
  workspaceId: string;
  onClose: () => void;
};

export const WorkspaceInviteModal = ({
  workspaceId,
  onClose,
}: WorkspaceInviteModalProps) => {
  const { t, i18n } = useTranslation("dashboard");
  const [copied, setCopied] = useState(false);
  const { data, isLoading, isError, error, refetch, isFetching } =
    useWorkspaceInviteQuery(workspaceId);
  const { regenerateInvite, isRegenerating, regenerateError } =
    useRegenerateWorkspaceInviteMutation(workspaceId);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isRegenerating) {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, isRegenerating]);

  const handleClose = () => {
    if (!isRegenerating) {
      onClose();
    }
  };

  const inviteCode = data?.inviteCode ?? "";
  const isExpired = Boolean(data?.isExpired) || !inviteCode;
  const expiresAtLabel =
    data?.expiresAt &&
    new Date(data.expiresAt).toLocaleString(i18n.language, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const handleCopy = async () => {
    if (!inviteCode || isExpired) {
      return;
    }

    await navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label={t("workspaceInvite.close")}
        className="absolute inset-0 bg-black/45 backdrop-blur-sm"
        onClick={handleClose}
      />

      <dialog
        open
        aria-labelledby="workspace-invite-title"
        aria-describedby="workspace-invite-description"
        className="relative z-10 m-0 flex w-full max-w-md flex-col gap-4 rounded-2xl border border-secondary-100 bg-white p-5 shadow-xl"
      >
        <WorkspaceInviteHeader />

        {isLoading || isFetching ? <WorkspaceInviteLoading /> : null}

        {isError ? (
          <WorkspaceInviteError
            message={error instanceof Error ? error.message : null}
            onRetry={() => void refetch()}
          />
        ) : null}

        {!isLoading && !isError && data ? (
          <>
            <WorkspaceInviteCodeCard
              inviteCode={inviteCode}
              isExpired={isExpired}
              expiresAtLabel={expiresAtLabel || null}
            />

            {isExpired ? <WorkspaceInviteExpiredBanner /> : null}

            <WorkspaceInviteFooter
              isExpired={isExpired}
              isCopied={copied}
              isRegenerating={isRegenerating}
              errorMessage={regenerateError}
              
              onCopy={() => void handleCopy()}
              onGenerate={() => regenerateInvite()}
            />
          </>
        ) : null}
      </dialog>
    </div>
  );
};
