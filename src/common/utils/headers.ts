"use server";

import { cookies, headers } from "next/headers";
import { ENV_CONSTANTS } from "@/common/constants/env.const";

export const defaultHeaders = async () => {
  const headersList = await headers();
  const clientIp = headersList.get("True-Client-IP");
  const fetchHeaders: Record<string, string> = {
    Authorization: `Bearer ${ENV_CONSTANTS.DEFAULT_API_BEARER_TOKEN}`,
    "Content-Type": "application/json",
  };

  if (clientIp) {
    fetchHeaders["True-Client-IP"] = clientIp;
  }

  return fetchHeaders;
};

export const requestUserLogInRefreshHeaders = async () => {
  const csrTokenCookie = (await cookies()).get("csr_token");
  const csrToken = csrTokenCookie?.value;
  const headersList = await headers();

  const atidCookie = (await cookies()).get("atid");
  const atidToken = atidCookie?.value;

  const clientIp = headersList.get("True-Client-IP");

  const fetchHeaders: Record<string, string> = {
    Authorization: `Bearer ${ENV_CONSTANTS.DEFAULT_API_BEARER_TOKEN}`,
    "Content-Type": "application/json",
  };

  if (csrToken) {
    fetchHeaders["X-CSRF-Token"] = csrToken;
  }

  if (atidToken) {
    fetchHeaders["Cookie"] = atidToken;
  }

  if (clientIp) {
    fetchHeaders["True-Client-IP"] = clientIp;
  }

  return fetchHeaders;
};

export const requestSessionInfoHeaders = async () => {
  const headersList = await headers();
  const clientIp = headersList.get("True-Client-IP");

  const accessToken = (await cookies()).get("ac_token");

  const validToken = accessToken
    ? accessToken.value
    : ENV_CONSTANTS.DEFAULT_API_BEARER_TOKEN;

  const fetchHeaders: Record<string, string> = {
    Authorization: `Bearer ${validToken}`,
    "Content-Type": "application/json",
  };

  if (clientIp) {
    fetchHeaders["True-Client-IP"] = clientIp;
  }

  return fetchHeaders;
};

export const defaultLoggedInHeaders = async () => {
  const accessToken = (await cookies()).get("ac_token");

  const validToken = accessToken
    ? accessToken.value
    : ENV_CONSTANTS.DEFAULT_API_BEARER_TOKEN;

  const fetchHeaders: Record<string, string> = {
    Authorization: `Bearer ${validToken}`,
    "Content-Type": "application/json",
  };

  return fetchHeaders;
};
