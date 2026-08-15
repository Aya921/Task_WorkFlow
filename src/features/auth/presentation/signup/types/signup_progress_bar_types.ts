export type SignupStepKey =
  | "account"
  | "verification"
  | "workspace"
  | "github"
  | "success";

export type SignupCircleContent = {
  stepNumber: number;
  stepKey: SignupStepKey;
};

export const signupSteps: SignupCircleContent[] = [
  { stepNumber: 1, stepKey: "account" },
  { stepNumber: 2, stepKey: "verification" },
  { stepNumber: 3, stepKey: "workspace" },
  { stepNumber: 4, stepKey: "github" },
  { stepNumber: 5, stepKey: "success" },
];
