import { z } from "zod";

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
  });

export type CreateProjectFormData = z.infer<
  ReturnType<typeof dashboardCreateProjectSchema>
>;
