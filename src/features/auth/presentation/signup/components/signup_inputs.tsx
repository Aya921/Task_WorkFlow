  import { LockKeyhole, Mail, User } from "lucide-react";
  import {  useFormContext } from "react-hook-form";


  import { InputField } from "../../../../../shared/components/input_field";
  import {  type SignupFormData } from "../types/signup_schema";
  import { SignupPasswordCheckList } from "./signup_passCheck";

  const strengthSteps = [1, 2, 3, 4];

  const getPasswordStrength = (password: string) => {
    let score = 0;
    let passLength = false;
    let passSpecialChar = false;
    let passNum = false;
    let passUpperCase=false;

    if (password.length >= 8) {
      score++;
      passLength = true;
    }
    if (/[A-Z]/.test(password)){
      score++;
      passUpperCase=true;
    }
    if (/\d/.test(password)) {
      score++;
      passNum = true;
    }
    if (/[!@#$%^&*]/.test(password)) {
      score++;
      passSpecialChar = true;
    }

    return { score, passSpecialChar, passLength, passNum ,passUpperCase};
  };

  export const SignupInputs = () => {

    const {register,watch,formState:{errors}}=useFormContext<SignupFormData>();
   


    const password = watch("password") ?? "";
    const passwordStrength = getPasswordStrength(password);

    const requirements = [
    {
      label: "8+ Characters",
      valid: passwordStrength.passLength,
    },
    {
      label: "Uppercase Letter",
      valid: passwordStrength.passUpperCase,
    },
    {
      label: "Number",
      valid: passwordStrength.passNum,
    },
    {
      label: "Special Character",
      valid: passwordStrength.passSpecialChar,
    },
  ];



    return (
      <div className="w-full py-4 flex flex-col gap-4">
        <InputField
          label="Full Name"
          icon={User}
          placeholder="Mohamed Salah Saber"
          {...register("fullName")}
          status={errors.fullName ? "error" : "default"}
          message={errors.fullName?.message}
        />

        <InputField
          label="Email"
          icon={Mail}
          type="email"
          placeholder="mohamedsalah@gmail.com"
          {...register("email")}
          status={errors.email ? "error" : "default"}
          message={errors.email?.message}
        />

        <div>
          <InputField
            label="Password"
            icon={LockKeyhole}
            placeholder="Enter your password"
            type="password"
            {...register("password")}
            status={errors.password ? "error" : "default"}
            message={errors.password?.message}
          />

          <div className="grid grid-cols-4 h-2 gap-2 mt-3">
            {strengthSteps.map((step) => (
              <div
                key={step}
                className={`rounded-full transition-all duration-300 ${
                  step <= passwordStrength.score ? "bg-primary-800" : "bg-primary-100"
                }`}
              />
            ))}
          </div>

          <div className=" flex flex-row  gap-2 mt-4 justify-between">

          {requirements.map((item)=>(
            <SignupPasswordCheckList key={item.label} label={item.label} isValid={item.valid}/>

          ))}
          
          </div>
        </div>
      </div>
    );
  };
