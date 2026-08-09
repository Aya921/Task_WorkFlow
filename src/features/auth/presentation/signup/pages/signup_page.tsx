import { useSignupContext } from "../hooks/use_signup_context";
import { SignupLayout } from "../layout/signup_layout";

export const SignUpPage = () => {
    const {nextStep, previousStep}=useSignupContext()
   
  return (
   
      <SignupLayout>
       <button type="button" className="bg-primary-800 text-white px-4 py-2 rounded-md" onClick={nextStep}>
        Next
       </button>


       <button type="button" className="bg-primary-800 text-white px-4 py-2 rounded-md" onClick={previousStep}>
        prev
       </button>
      </SignupLayout>
  
  );
};
