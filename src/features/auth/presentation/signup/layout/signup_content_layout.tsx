import { LazyLoadingAnimation } from "../../../../../animations/lazy_loading_animation";
import { useAuth } from "../../../../../hooks/use_auth";
import { SignupProgressBar } from "./signup_progressbar";

export const SignupContentLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { profileLoading, sessionLoading, profileFetching } = useAuth();

  //  console.log("SignupContentLayout Render");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 overflow-x-hidden px-4 py-4 sm:gap-8 sm:px-6 sm:py-6 md:px-8 md:py-8">
      <SignupProgressBar />

      <div className="flex w-full max-w-6xl flex-col rounded-2xl bg-surface p-4 shadow-md sm:rounded-3xl sm:p-6 md:min-h-[70vh] md:p-8 lg:min-h-[75vh] lg:p-10">
        {profileLoading || sessionLoading || profileFetching ? (
          <div className="flex w-full flex-1 items-center justify-center">
            <LazyLoadingAnimation />
          </div>
        ) : (
          <div className="flex w-full  flex-1 flex-col justify-between ">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
