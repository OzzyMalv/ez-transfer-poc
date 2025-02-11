import { z } from "zod";

export const RenameSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "form_validation.form.validation.required" })
    .regex(/^[^<>:"/\\|?*]*$/, {
      message: "form_validation.form.validation.invalid.characters",
    }),
});

export type RenameSchemaType = z.infer<typeof RenameSchema>;
