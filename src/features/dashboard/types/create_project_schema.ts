import { z } from "zod";
import { INVITATION_EXPIRY_VALUES } from "../presentation/components/projectCreation/invitation_expiry_options";

export const DESCRIPTION_MAX_LENGTH = 240;

export const dashboardCreateProjectSchema = (t: (key: string) => string) =>
  z.object({
    projectName: z
      .string()
      .trim()
      .min(1, { message: t("createProject.validation.nameRequired") }),
    projectDescription: z.string().max(DESCRIPTION_MAX_LENGTH, {
      message: t("createProject.validation.descriptionMax"),
    }),
    projectColor: z
      .string()
      .min(1, { message: t("createProject.validation.colorRequired") }),
    projectMembers: z.array(z.string()),
    invitationExpiry: z.enum(INVITATION_EXPIRY_VALUES),
  });

export type CreateProjectFormData = z.infer<
  ReturnType<typeof dashboardCreateProjectSchema>
>;
