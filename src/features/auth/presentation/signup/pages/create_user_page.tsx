import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserCreateAccountAnimation } from "../../../../../animations/user_create_account";

import { TextLink } from "../../../../../shared/components/text_link";
import { SignupInputs } from "../components/create_account/signup_inputs";
import {
  createSignupSchema,
  type SignupFormData,
} from "../types/signup_schema";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../../routes/route_path";
import { useSignupContext } from "../hooks/use_signup_context";
import type { SignupEntity } from "../../../domain/entity/signup_entity";
import { NavigationButtons } from "../components/navigation_btns";
import { AuthSectionHeader } from "../components/auth_header";

export const CreateUserPage = () => {
  const { t } = useTranslation("signup");
  const navigate = useNavigate();
  const { nextStep, updateSignupData, signupData } = useSignupContext();
  const methods = useForm<SignupFormData>({
    resolver: zodResolver(createSignupSchema(t)),
    mode: "onChange",
    defaultValues: {
      fullName: signupData.fullName,
      email: signupData.email,
      password: signupData.password,
    },
  });

  const {
    formState: { isValid },
    handleSubmit,
  } = methods;

  const onSubmit = (data: SignupEntity) => {
    updateSignupData(data);
    nextStep();
    navigate(ROUTES.VERIFICATION);
  };

  return (
    <FormProvider {...methods}>
      <div className="flex w-full flex-col gap-6 overflow-x-hidden lg:flex-row lg:gap-8">
        <div className="flex w-full min-w-0 flex-col gap-4 lg:flex-[2]">
          <AuthSectionHeader title={t("title")} description={t("description")} />
          <SignupInputs />

          <NavigationButtons
            nextLabel={t("buttons.continue")}
            isNextDisabled={!isValid}
            showBackButton={false}
            onNext={handleSubmit(onSubmit)}
          />

          <TextLink
            className="text-primary-800"
            text={t("links.alreadyHaveAccount")}
            actionText={t("links.loginHere")}
          />
        </div>

        <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
          <UserCreateAccountAnimation />
        </div>
      </div>
    </FormProvider>
  );
};
