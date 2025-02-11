import { z } from "zod";

const regionField = z.object({
  id: z.number(),
  name: z.string(),
});

const jobTitleField = z.object({
  id: z.number().optional(),
  name: z.string(),
});

export const ProfileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(64, { message: "form_validation.form.error.name.char.limit" })
    .min(1, { message: "form_validation.form.validation.required" }),
  lastName: z
    .string()
    .trim()
    .max(64, { message: "form_validation.form.error.name.char.limit" })
    .min(1, { message: "form_validation.form.validation.required" }),
  region: regionField.optional(),
  jobTitle: jobTitleField.optional(),
  isMarketingOptIn: z.boolean().optional(),
});

export const ProfileSchemaWithEmail = ProfileSchema.extend({
  email: z.string(),
});

export type ProfileSchemaType = z.infer<typeof ProfileSchema>;
export type ProfileSchemaWithEmailType = z.infer<typeof ProfileSchemaWithEmail>;
