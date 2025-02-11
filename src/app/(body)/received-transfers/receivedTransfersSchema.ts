import { z } from "zod";

export const SaveToWorkspaceSchema = z.object({
  name: z.string().optional(),
});

export type SaveToWorkspaceSchemaType = z.infer<typeof SaveToWorkspaceSchema>;

export const SubmitPasswordSchema = z.object({
  password: z.string().optional(),
});

export type SubmitPasswordSchemaType = z.infer<typeof SubmitPasswordSchema>;
