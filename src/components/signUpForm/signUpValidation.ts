import { z } from "zod";

const ruleOneUppercase = /(?=.*[A-Z])/;
const ruleOneLowercase = /(?=.*[a-z])/;
const ruleOneDigit = /(?=.*\d)/;

const ruleNoStartEndWithSpaces = /^(?!\s).*\S(?<!\s)$/;

export const SignUpSchema = z.object({
  email: z.string().email("form_validation.form.validation.emailError"),
  password: z
    .string()
    .min(10, "form_validation.form.password.hint.length")
    .regex(ruleOneUppercase, "form_validation.form.password.hint.uppercase")
    .regex(ruleOneLowercase, "form_validation.form.password.hint.lowercase")
    .regex(ruleOneDigit, "form_validation.form.password.hint.number")
    // this rule will not be used as "hint"
    .regex(
      ruleNoStartEndWithSpaces,
      "form_validation.form.password.error.spaces",
    ),
  isMarketingOptIn: z.boolean(),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export const SignUpEmailSchema = SignUpSchema.pick({ email: true });
export const PasswordSchema = SignUpSchema.pick({ password: true });
export type SignUpEmailSchemaType = z.infer<typeof SignUpEmailSchema>;
