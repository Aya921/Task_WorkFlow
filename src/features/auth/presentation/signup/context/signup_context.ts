import { createContext } from "react";
import type { SignupEntity } from "../../../domain/entity/signup_entity";

type SignupContextType = {
    totalSteps: number;
    currentStep: number;
    nextStep: () => void;
    previousStep: () => void;

    signupData:SignupEntity
    updateSignupData: (data: Partial<SignupEntity>) => void;
   

}

export const SignupContext = createContext<SignupContextType | null>(null);