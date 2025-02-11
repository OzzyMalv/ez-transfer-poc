import { z } from "zod";

export const SenderFormSchema = z
  .object({
    receivers: z.array(
      z.object({
        email: z.string().email("form_validation.form.validation.emailError"),
      }),
    ), // minimum 1 receiver when sendType is false
    message: z.string().optional(),
    password: z.object({
      enable: z.boolean(),
      value: z.string().optional(),
    }),
    sendType: z.boolean(), // Needed in superRefine
  })
  .superRefine((data, ctx) => {
    if (!data.sendType) {
      if (!data.receivers.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "form_validation.form.error.receiverEmpty",
        });
      }
    }
    if (data.password.enable) {
      if (!data.password.value) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "form_validation.form.error.passwordEmpty",
          path: ["password", "value"],
        });
      } else if (data.password.value.length > 24) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "form_validation.form.error.password.char.limit",
          path: ["password", "value"],
        });
      } else if (data.password.value.includes(" ")) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "form_validation.form.error.password.char.space",
          path: ["password", "value"],
        });
      }
    }
  });

export type SenderFormSchemaType = z.infer<typeof SenderFormSchema>;
