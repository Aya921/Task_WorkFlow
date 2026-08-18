  import { SignupProgressBar } from "./signup_progressbar";

  export const SignupContentLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-10 overflow-x-hidden px-4  sm:px-6 sm:py-3 md:px-8 ">
        <SignupProgressBar />

        <div className="w-full flex  max-w-6xl rounded-4xl  bg-surface shadow-md md:min-h-[70vh] lg:min-h-[75vh] p-10">
          {children}
        </div>
      </div>
    );
  };
