import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../../../shared/components/button";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { useUpdateOnboardingStepMutation } from "../../profile/hook/use_update_onboarding_step";
import { useAuth } from "../../../../../hooks/use_auth";

interface WorkspaceCodeViewProps {
  inviteCode: string;
}

export const WorkspaceCodeView = ({
  inviteCode,
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
    );
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-7 sm:gap-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-secondary-200 bg-primary-50 text-primary-600 shadow-sm">
        <Check className="h-8 w-8" aria-hidden />
      </div>

      <div className="max-w-md text-center">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-secondary-900 sm:text-3xl">
          Workspace Created Successfully
        </h2>
        <p className={`${FONT_STYLES.bodySm} text-secondary-500`}>
          Share this invite code with your team members so they can join your
          workspace.
        </p>
      </div>

      <div className="w-full max-w-sm">
        <div className="rounded-xl border border-secondary-200 bg-white p-5 text-center shadow-sm">
          <p className={`${FONT_STYLES.caption} mb-2 text-secondary-500`}>
            Workspace Invite Code
          </p>
          <p
            className={`${FONT_STYLES.h3} font-mono tracking-wider text-secondary-900`}
          >
            {inviteCode}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleCopyCode}
        className={`flex w-full max-w-sm cursor-pointer items-center justify-center gap-2 rounded-lg border px-4 py-2.5 transition-[background-color,border-color,color] duration-150 ease-out ${
          copied
            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
            : "border-secondary-200 bg-white text-primary-600 hover:border-primary-300 hover:bg-secondary-50"
        }`}
      >
        {copied ? (
          <>
            <Check size={18} aria-hidden />
            <span className={FONT_STYLES.button}>Copied!</span>
          </>
        ) : (
          <>
            <Copy size={18} aria-hidden />
            <span className={FONT_STYLES.button}>Copy Code</span>
          </>
        )}
      </button>

      <div className="w-full max-w-sm">
        <Button
          onClick={handleContinue}
          disabled={false}
          isLoading={isUpdatingOnboardingStep}
          error={updatingOnboardingStepError}
          className="w-full"
          activeClassName="bg-primary-600 text-white shadow-sm hover:bg-primary-700 hover:shadow-md"
          disabledClassName="cursor-not-allowed bg-secondary-200 text-secondary-500"
        >
          <span className={FONT_STYLES.button}>Continue</span>
        </Button>
      </div>
    </div>
  );
};
