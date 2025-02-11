// src/types/i18next.d.ts
import "react-i18next";
import { TFunction } from "i18next";
import { TransProps as OriginalTransProps } from "react-i18next";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof import("@/public/locales/en/common.json");
      formValidation: typeof import("@/public/locales/en/formValidation.json");
      "404": typeof import("@/public/locales/en/404.json");
      account: typeof import("@/public/locales/en/account.json");
      accountResetPasswordSent: typeof import("@/public/locales/en/accountResetPasswordSent.json");
      error: typeof import("@/public/locales/en/error.json");
      expired: typeof import("@/public/locales/en/expired.json");
      login: typeof import("@/public/locales/en/login.json");
      preferences: typeof import("@/public/locales/en/preferences.json");
      pricing: typeof import("@/public/locales/en/pricing.json");
      receiver: typeof import("@/public/locales/en/receiver.json");
      receiverSessionFiles: typeof import("@/public/locales/en/receiverSessionFiles.json");
      register: typeof import("@/public/locales/en/register.json");
      registerExpired: typeof import("@/public/locales/en/registerExpired.json");
      registerSuccess: typeof import("@/public/locales/en/registerSuccess.json");
      registerVerify: typeof import("@/public/locales/en/registerVerify.json");
      resetPassword: typeof import("@/public/locales/en/resetPassword.json");
      resetPasswordExpired: typeof import("@/public/locales/en/resetPasswordExpired.json");
      resetPasswordReset: typeof import("@/public/locales/en/resetPasswordReset.json");
      resetPasswordSent: typeof import("@/public/locales/en/resetPasswordSent.json");
      resetPasswordSuccess: typeof import("@/public/locales/en/resetPasswordSuccess.json");
      sender: typeof import("@/public/locales/en/sender.json");
      success: typeof import("@/public/locales/en/success.json");
      upload: typeof import("@/public/locales/en/upload.json");
      virusDetected: typeof import("@/public/locales/en/virusDetected.json");
    };
  }

  interface TransProps extends Omit<OriginalTransProps, "t"> {
    t: TFunction;
  }
}
