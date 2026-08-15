import { ArrowRight } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserCreateAccountAnimation } from "../../../../../animations/user_create_account";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { Button } from "../../../../../shared/components/button";
import { TextLink } from "../../../../../shared/components/text_link";
import { SignupHeader } from "../components/create_account/signup_header";
import { SignupInputs } from "../components/create_account/signup_inputs";
import { signupSchema, type SignupFormData } from "../types/signup_schema";

export const SignUpPage = () => {
  const { t } = useTranslation("signup");
  const methods = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const {
    formState: { isValid },
  } = methods;

  return (
   
      <FormProvider {...methods}>
        <div className="flex flex-col gap-6 overflow-x-hidden lg:flex-row lg:gap-8 lg:p-10">
          <div className="flex w-full min-w-0 flex-col gap-4 lg:flex-[2]">
            <SignupHeader />
            <SignupInputs />

            <Button
              disabled={!isValid}
              activeClassName="bg-primary-800 hover:bg-primary-900 text-white cursor-pointer"
              disabledClassName="bg-primary-200 text-white cursor-not-allowed"
            >
              <span className={FONT_STYLES.button}>
                {t("buttons.continue")}
              </span>
              <ArrowRight
                size={20}
                className="shrink-0 rtl:rotate-180"
                aria-hidden
              />
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
   
  );
};
