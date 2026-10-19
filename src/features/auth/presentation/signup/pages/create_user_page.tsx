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
import type { CreateUserStepEntity } from "../../../domain/entity/crate_user_entity";
import { AuthSectionHeader } from "../components/auth_header";
import { Button } from "../../../../../shared/components/button";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { useCreateUserMutation } from "../hooks/use_create_user_mutation";
import { PageTransition } from "../layout/page_transition";

import { useNavigate } from "react-router-dom";


export const CreateUserPage = () => {
  const { t } = useTranslation("signup");
  const methods = useForm<SignupFormData>({
    resolver: zodResolver(createSignupSchema(t)),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const {
    formState: { isValid },
    handleSubmit,
  } = methods;

  const { createUserFn, isLoading } = useCreateUserMutation();
  const navigate = useNavigate();

  const onSubmit = (data: CreateUserStepEntity) => {
    createUserFn(data, {
      onSuccess(data) {
        // set session storage then told guard if it verification then go noramal
        // navigate to verification
        // remove session storage
        sessionStorage.setItem(
          "pendingVerification",
          JSON.stringify({
            email: data?.email,
          }),
        );
        console.log(data)

        navigate("/signup/verification");
      },
    });
  };

  return (
    <PageTransition>
      <FormProvider {...methods}>
        <div className="flex w-full flex-1 flex-col gap-6 overflow-x-hidden lg:flex-row lg:gap-8">
          <div className="flex w-full min-w-0 flex-col gap-4 lg:flex-[2]">
            <AuthSectionHeader
              title={t("title")}
              description={t("description")}
            />
            <SignupInputs />

            <Button
              onClick={handleSubmit(onSubmit)}
              isLoading={isLoading}
              disabled={!isValid}
              activeClassName="bg-gradient-to-r from-primary-600 via-primary-500 to-violet-500 text-white shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30"
              disabledClassName="bg-slate-200 text-slate-500 cursor-not-allowed"
              className="w-full"
            >
              <span className={FONT_STYLES.button}>
                {t("buttons.continue")}
              </span>
            </Button>

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
    </PageTransition>
  );
};
