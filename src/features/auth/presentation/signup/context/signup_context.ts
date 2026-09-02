import { createContext } from "react";
import type { CreateUserStepEntity } from "../../../domain/entity/crate_user_entity";

type SignupContextType = {
    totalSteps: number;
    currentStep: number;
    nextStep: () => string;
    // previousStep: () => string;

    signupData:CreateUserStepEntity
    updateSignupData: (data: Partial<CreateUserStepEntity>) => void;
   

}

export const SignupContext = createContext<SignupContextType | null>(null);