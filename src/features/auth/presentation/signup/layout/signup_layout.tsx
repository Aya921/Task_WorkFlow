import { SignupProgressBar } from "./signup_progressbar";

export const SignupLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen gap-4  ">
      {/* progress bar */}
     <SignupProgressBar />
      {/* white box */}
      <div className="  bg-surface w-full max-w-6xl min-h-[85vh] shadow-md rounded-md ">
       
        {children}
      </div>
    </div>
  );
};
