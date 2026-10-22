import { LazyLoadingAnimation } from "../../../../../animations/lazy_loading_animation";
import { useAuth } from "../../../../../hooks/use_auth";
import { SignupProgressBar } from "./signup_progressbar";

export const SignupContentLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { profileLoading, sessionLoading, profileFetching } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 overflow-x-hidden px-4 py-6 sm:gap-6 sm:px-6 sm:py-8 md:px-8">
      <SignupProgressBar />

      <div className="flex w-full max-w-5xl flex-col rounded-2xl border border-secondary-200 bg-surface p-5 shadow-sm sm:p-6 md:min-h-[68vh] md:p-8 lg:min-h-[72vh] lg:p-10">
        {profileLoading || sessionLoading || profileFetching ? (
          <div className="flex w-full flex-1 items-center justify-center">
            <LazyLoadingAnimation />
          </div>
        ) : (
          <div className="flex w-full flex-1 flex-col justify-between">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
