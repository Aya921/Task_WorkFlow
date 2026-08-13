import { ArrowRight } from "lucide-react";
import { SignupHeader } from "../components/signup_header";
import { SignupInputs } from "../components/signup_inputs";
import { SignupLayout } from "../layout/signup_layout";
import { FormProvider, useForm } from "react-hook-form";
import { signupSchema, type SignupFormData } from "../types/signup_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../../../shared/components/button";
import { TextLink } from "../../../../../shared/components/text_link";
import { UserCreateAccountAnimation } from "../../../../../animations/user_create_account";

export const SignUpPage = () => {
  const methods = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const {
    formState: { isValid },
  } = methods;

  return (
    <FormProvider {...methods}>
      <SignupLayout>
        <div className="p-10 flex gap-3  ">

          <div className="w-full flex flex-col gap-4 flex-2">
            <SignupHeader />
            <SignupInputs />

            <Button
              disabled={!isValid}
              activeClassName=" bg-primary-800 hover:bg-primary-900 text-white cursor-pointer "
              disabledClassName=" bg-primary-200 text-white cursor-not-allowed"
            >
              <span>Continue to Verification</span>
              <ArrowRight size={20} />
            </Button>

          <TextLink className="text-primary-800 " text={"Already Have Account?"} actionText={"Login Here"}></TextLink>

  
          </div>

          <div className="flex-1 flex items-center justify-center">
            <UserCreateAccountAnimation />
          </div>
        </div>
      </SignupLayout>
    </FormProvider>
  );
};
