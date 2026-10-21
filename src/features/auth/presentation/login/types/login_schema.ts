import { z } from "zod";

export const createLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z.email({ message: t("validation.emailInvalid") }),
    password: z
      .string()
      .min(1, { message: t("validation.passwordRequired") }),
    rememberMe: z.boolean(),
  });

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;
