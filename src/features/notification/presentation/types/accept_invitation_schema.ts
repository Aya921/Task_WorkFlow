import { z } from "zod";

export const createAcceptInvitationSchema = (t: (key: string) => string) =>
  z.object({
    jobTitle: z
      .string()
      .trim()
      .min(1, { message: t("acceptInvitation.validation.jobTitleRequired") }),
  });

export type AcceptInvitationFormData = z.infer<
  ReturnType<typeof createAcceptInvitationSchema>
>;
