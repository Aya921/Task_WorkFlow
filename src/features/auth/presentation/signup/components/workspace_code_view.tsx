import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../../../shared/components/button";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { useUpdateOnboardingStepMutation } from "../../profile/hook/use_update_onboarding_step";
import { useAuth } from "../../../../../hooks/use_auth";

interface WorkspaceCodeViewProps {
  inviteCode: string;
  onContinue?: () => void;
}

export const WorkspaceCodeView = ({
  inviteCode,
  onContinue,
}: WorkspaceCodeViewProps) => {
  const [copied, setCopied] = useState(false);
  const { user } = useAuth();
  const {
    updateOnboardingStepFn,
    isLoading: isUpdatingOnboardingStep,
    error: updatingOnboardingStepError,
  } = useUpdateOnboardingStepMutation();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleContinue = () => {
    if (!user?.id) return;

    updateOnboardingStepFn(
      {
        userId: user.id,
        onboardingStep: "github",
       
      },
      {
        onSuccess: () => {
          onContinue?.();
        },
      },
    );
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 sm:gap-10">
      <div className="relative">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent-400 to-primary-500">
          <span className="text-4xl">🎉</span>
        </div>
        <div className="absolute inset-0 animate-pulse rounded-full bg-accent-400/20"></div>
      </div>

      <div className="text-center">
        <h2 className={`${FONT_STYLES.h2} mb-2 text-primary-900`}>
          Workspace Created Successfully
        </h2>
        <p className={`${FONT_STYLES.body} text-secondary-600`}>
          Share this invite code with your team members so they can join your
          workspace.
        </p>
      </div>

      <div className="w-full max-w-sm">
        <div className="rounded-lg border-2 border-primary-200 bg-gradient-to-br from-primary-50 to-accent-50 p-6 text-center">
          <p className={`${FONT_STYLES.bodySm} mb-3 text-secondary-600`}>
            Workspace Invite Code
          </p>
          <p className={`${FONT_STYLES.h3} font-mono tracking-wider text-primary-900`}>
            {inviteCode}
          </p>
        </div>
      </div>

      <button
        onClick={handleCopyCode}
        className={`flex w-full max-w-sm items-center justify-center gap-2 rounded-full border-2 border-primary-200 px-4 py-3 transition-all duration-200 ${
          copied
            ? "bg-accent-100 text-accent-700 border-accent-300"
            : "bg-white text-primary-600 hover:bg-primary-50 hover:border-primary-300"
        }`}
      >
        {copied ? (
          <>
            <Check size={18} />
            <span className={FONT_STYLES.button}>Copied!</span>
          </>
        ) : (
          <>
            <Copy size={18} />
            <span className={FONT_STYLES.button}>Copy Code</span>
          </>
        )}
      </button>

      <div className="w-full">
        <Button
          onClick={handleContinue}
          disabled={false}
          isLoading={isUpdatingOnboardingStep}
          error={updatingOnboardingStepError}
          className="w-full"
          activeClassName="bg-gradient-to-r from-primary-600/90 via-primary-500/80 to-rose-100/80 shadow-lg shadow-primary-500/10 hover:shadow-xl hover:shadow-primary-500/20 transition-all text-white cursor-pointer"
          disabledClassName="bg-primary-200 text-white cursor-not-allowed"
        >
          <span className={FONT_STYLES.button}>Continue</span>
        </Button>
      </div>
    </div>
  );
};
