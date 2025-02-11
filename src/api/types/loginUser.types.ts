import { ILookup } from "@/components/profileForm/ProfileForm";

export interface IRequestUserLogIn {
  email: string;
  password: string;
}

export interface IResponseUserLogIn {
  accessToken: string;
  idToken: string;
  status: "Unverified" | "IncompleteProfile" | "Verified" | "Disabled";
  challengeName: null;
  challengeSession: null;
  csr: string;
}

export interface IResponseUserRefresh {
  accessToken: string;
  idToken: string;
  csr: string;
}

export interface IRequestUserPasswordReset {
  email: string;
}

export interface IRequestUserProfileUpdate {
  email: string;
  firstName: string | null;
  lastName: string | null;
  region?: ILookup;
  jobTitle?: ILookup;
  isMarketingOptIn?: boolean;
}

export interface IRequestUserConfirmPasswordReset {
  secureToken: string;
  password: string;
}

export interface ISSOAuth {
  code: string;
  state?: string;
}

export interface ISSOAuthResponse {
  redirectUrl: string;
}

export interface ISSOAuthCodeResponse {
  accessToken: string;
  challengeName: null | string;
  challengeSession: null | string;
  idToken: string;
  status: string;
  csr: string;
}
