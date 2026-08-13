import { createContext } from "react";

type SignupContextType = {
    totalSteps: number;
    currentStep: number;
  
    
    nextStep: () => void;
    previousStep: () => void;
   

}

export const SignupContext = createContext<SignupContextType | null>(null);