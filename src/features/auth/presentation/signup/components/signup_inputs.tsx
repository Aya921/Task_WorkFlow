import { LockKeyhole, Mail, User } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { InputField } from "../../../../../shared/components/input_field";
import { type SignupFormData } from "../types/signup_schema";
import { SignupPasswordCheckList } from "./signup_passCheck";

const strengthSteps = [1, 2, 3, 4];

const getPasswordStrength = (password: string) => {
  let score = 0;
  let passLength = false;
  let passSpecialChar = false;
  let passNum = false;
  let passUpperCase = false;

  if (password.length >= 8) {
    score++;
    passLength = true;
  }
  if (/[A-Z]/.test(password)) {
    score++;
    passUpperCase = true;
  }
  if (/\d/.test(password)) {
    score++;
    passNum = true;
  }
  if (/[!@#$%^&*]/.test(password)) {
    score++;
    passSpecialChar = true;
  }

  return { score, passSpecialChar, passLength, passNum, passUpperCase };
};

export const SignupInputs = () => {
  const { t } = useTranslation("signup");
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<SignupFormData>();

  const password = watch("password") ?? "";
  const passwordStrength = getPasswordStrength(password);

  const requirements = [
    {
      label: t("passwordRequirements.characters"),
      valid: passwordStrength.passLength,
    },
    {
      label: t("passwordRequirements.uppercase"),
      valid: passwordStrength.passUpperCase,
    },
    {
      label: t("passwordRequirements.number"),
      valid: passwordStrength.passNum,
    },
    {
      label: t("passwordRequirements.specialCharacter"),
      valid: passwordStrength.passSpecialChar,
    },
  ];

  return (
    <div className="flex w-full flex-col gap-4 py-2 sm:py-4">
      <InputField
        label={t("inputs.fullName.label")}
        icon={User}
        placeholder={t("inputs.fullName.placeholder")}
        {...register("fullName")}
        status={errors.fullName ? "error" : "default"}
        message={errors.fullName?.message}
      />

      <InputField
        label={t("inputs.email.label")}
        icon={Mail}
        type="email"
        placeholder={t("inputs.email.placeholder")}
        {...register("email")}
        status={errors.email ? "error" : "default"}
        message={errors.email?.message}
      />

      <div>
        <InputField
          label={t("inputs.password.label")}
          icon={LockKeyhole}
          placeholder={t("inputs.password.placeholder")}
          type="password"
          {...register("password")}
          status={errors.password ? "error" : "default"}
          message={errors.password?.message}
        />

        <div className="mt-3 grid h-2 grid-cols-4 gap-1 sm:gap-2">
          {strengthSteps.map((step) => (
            <div
              key={step}
              className={`rounded-full transition-all duration-300 ${
                step <= passwordStrength.score
                  ? "bg-primary-800"
                  : "bg-primary-100"
              }`}
            />
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-2 gap-y-3 sm:grid-cols-4">
          {requirements.map((item) => (
            <SignupPasswordCheckList
              key={item.label}
              label={item.label}
              isValid={item.valid}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
