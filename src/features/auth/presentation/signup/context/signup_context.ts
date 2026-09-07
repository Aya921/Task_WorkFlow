import { createContext } from "react";

type SignupContextType = {
    totalSteps: number;
    currentStep: number;
    nextStep: () => string;
    // previousStep: () => string;

   // signupData:CreateUserStepEntity
    //updateSignupData: (data: Partial<CreateUserStepEntity>) => void;
   

}

export const SignupContext = createContext<SignupContextType | null>(null);