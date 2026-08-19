import { z } from "zod";

export const createSignupSchema = (t: (key: string) => string) => z.object({
  fullName: z
    .string()
    .trim()
    .min(3, { message: t("validation.fullNameLength") })
    .refine(
      (value) => value.split(/\s+/).length >= 2,
      { message: t("validation.fullNameParts") }
    ),

  email: z.email({
    message: t("validation.email"),
  }),

  password: z
    .string()
    .min(8, { message: t("validation.passwordLength") })
    .regex(/[A-Z]/, {
      message: t("validation.passwordUppercase"),
    })
    .regex(/[a-z]/, {
      message: t("validation.passwordLowercase"),
    })
    .regex(/\d/, {
      message: t("validation.passwordNumber"),
    })
    .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, {
      message: t("validation.passwordSpecialCharacter"),
    }),
});

export type SignupFormData = z.infer<ReturnType<typeof createSignupSchema>>;
