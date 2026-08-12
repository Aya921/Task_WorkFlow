import { SignupHeader } from "../components/signup_header";
import { SignupInputs } from "../components/signup_inputs";
import { SignupLayout } from "../layout/signup_layout";

export const SignUpPage = () => {
  
  return (
    <SignupLayout>
      <div className="p-10 flex-flex-col ">
        <SignupHeader />

        <SignupInputs />
      </div>
    </SignupLayout>
  );
};
