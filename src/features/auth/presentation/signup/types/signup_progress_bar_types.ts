export type SignupProgressBarTypes= "Account"|"Verification"|"Workspace"|"GitHub"|"Success";

export type SignupCircleContent={
    stepNumber:number;
    stepName:SignupProgressBarTypes;
}

export const signupSteps: SignupCircleContent[] = [
  { stepNumber: 1, stepName: "Account" },
  { stepNumber: 2, stepName: "Verification" },
  { stepNumber: 3, stepName: "Workspace" },
  { stepNumber: 4, stepName: "GitHub" },
  { stepNumber: 5, stepName: "Success" }
];