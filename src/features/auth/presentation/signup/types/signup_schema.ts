import { z } from "zod";

export const signupSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, { message: "Full name must be at least 3 characters" })
    .refine(
      (value) => value.split(/\s+/).length >= 2,
      { message: "Please enter first and last name" }
    ),

  email: z.email({
    message: "Please enter a valid email address",
  }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/\d/, {
      message: "Password must contain at least one number",
    })
    .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, {
      message: "Password must contain at least one special character",
    }),
});

export type SignupFormData = z.infer<typeof signupSchema>; // convert to type = fullname,email,password  