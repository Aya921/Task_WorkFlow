import { useState } from "react";
import { Bell, UserPlus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/use_auth";
import { WorkspaceInviteModal } from "../../features/dashboard/presentation/components/workspaceInvite/workspace_invite_modal";
import { ROUTES } from "../../routes/route_path";
import { Button } from "../components/button";

export const MainHeader = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation("dashboard");
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const workspaceId = profile?.currentWorkspaceId ?? undefined;
  const canInvite =
    Boolean(workspaceId) && profile?.currentWorkspaceRole === "owner";

  return (
    <div className="relative w-full">
      <header className="fixed top-0 z-50 flex w-full items-center justify-between p-2">
        <div className="flex-1" />

        <div className="flex items-center gap-3">
          <Button
            activeClassName="bg-gray-200"
            type="button"
            aria-label={t("workspaceInvite.open")}
            onClick={() => navigate(ROUTES.NOTIFICATIONS)}
            className="rounded-xl bg-gray-50 p-3 text-gray-600 transition-colors hover:bg-gray-100"
          >
            <Bell size={18} />
          </Button>
        </div>
      </header>

      <main>{children}</main>

      {canInvite ? (
        <div className="fixed bottom-0 right-0 flex h-20 w-20 items-center justify-center p-2">
          <Button
            activeClassName="bg-primary-700"
            type="button"
            aria-label={t("workspaceInvite.open")}
            onClick={() => setIsInviteOpen(true)}
            className="rounded-xl bg-primary-600 p-3 text-white transition-colors hover:bg-primary-700"
          >
            <UserPlus size={18} />
          </Button>
        </div>
      ) : null}

      {isInviteOpen && workspaceId ? (
        <WorkspaceInviteModal
          workspaceId={workspaceId}
          onClose={() => setIsInviteOpen(false)}
        />
      ) : null}
    </div>
  );
};
