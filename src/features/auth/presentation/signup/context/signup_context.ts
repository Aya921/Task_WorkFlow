import { createContext } from "react";

type SignupContextType = {
    totalSteps: number;
    currentStep: number;
   // maxStepReached: number;
    
    nextStep: () => void;
    previousStep: () => void;
    //goToStep: (step: number) => void;

}

export const SignupContext = createContext<SignupContextType | null>(null);