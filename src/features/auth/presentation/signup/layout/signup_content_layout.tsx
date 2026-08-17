  import { SignupProgressBar } from "./signup_progressbar";

  export const SignupContentLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 overflow-x-hidden px-4 sm:gap-4 sm:px-6  md:px-8">
        <SignupProgressBar />

        <div className="w-full flex  max-w-6xl rounded-4xl  bg-surface shadow-md md:min-h-[80vh] lg:min-h-[85vh] lg:p-10">
          {children}
        </div>
      </div>
    );
  };
