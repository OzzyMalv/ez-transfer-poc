import { jwtDecode } from "jwt-decode";
import { IResponseUserRefresh } from "@/api/types/loginUser.types";
import { navigateTo } from "@/common/utils/navigation";
import routes from "@/common/constants/routes";
import { setAxiosAccessToken } from "@/common/utils/axiosUtils";
import { ENV_CONSTANTS } from "@/common/constants/env.const";

const AUTH_KEY = "auth";

interface JwtPayload {
  email: string;
  exp: number;
}

interface IAuth {
  accessToken: string;
  challengeName: null;
  challengeSession: null;
  idToken: string;
  status: "Unverified" | "IncompleteProfile" | "Verified" | "Disabled";
  csr: string;
}

let lastRefreshAttempt = 0;

const refreshAttemptedRecently = () => {
  const now = new Date().getTime();
  const timeSinceLastRefreshAttempt = now - lastRefreshAttempt;
  return timeSinceLastRefreshAttempt < 30 * 1000; // 30 seconds ago
};

export const isRefreshRequired = () => {
  if (refreshAttemptedRecently()) {
    return false;
  }
  const authInfo = getAuthenticatedUserInfo();
  if (!authInfo) {
    return false;
  }
  const expiryMs = getExpiryDifference(authInfo?.exp);

  const expiryWindowMinutes =
    Number(ENV_CONSTANTS.TOKEN_REFRESH_WINDOW_MINUTES) || 15; // Default to 15, just in case
  return expiryMs < expiryWindowMinutes * 60 * 1000;
};

export const isAuthenticated = () => {
  return !!getAuthenticatedUserInfo()?.accessToken;
};

const getStoredAuthInfo = () => {
  const storageAuth = getStorageAuth();
  return storageAuth
    ? { ...storageAuth, ...jwtDecode<JwtPayload>(storageAuth.idToken) }
    : null;
};

const getStorageAuth = (): IAuth | null => {
  let storageAuth = null;
  try {
    const auth = localStorage.getItem(AUTH_KEY);
    if (auth) {
      storageAuth = JSON.parse(auth);
      if (storageAuth && !storageAuth.idToken) {
        localStorage.removeItem(AUTH_KEY);
        storageAuth = null;
      }
    }
  } catch {}
  return storageAuth;
};

export const getAuthenticatedUserInfo = () => {
  const authInfo = getStoredAuthInfo();

  // Check if token expired
  if (isExpired(authInfo)) {
    if (!authInfo?.csr) {
      localStorage.removeItem(AUTH_KEY);
      return null;
    }
  }
  return authInfo;
};

const isExpired = (authInfo: (IAuth & JwtPayload) | null) => {
  if (!authInfo) {
    return true;
  }
  return Boolean(getExpiryDifference(authInfo.exp) < 0);
};

const getExpiryDifference = (exp: number) => {
  const expiryDate = new Date(exp * 1000).getTime();
  const now = new Date().getTime();
  return Number(expiryDate - now);
};

export const setAuthenticationInfo = async (data: IResponseUserRefresh) => {
  const currentStorage = getStorageAuth();
  const setData = currentStorage ? { ...currentStorage, ...data } : { ...data };

  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(setData));
    await setAxiosAccessToken(setData.accessToken);
  } catch {
    // ignore
  }
};

export const updateToken = async (dispatchLogout: () => void) => {
  lastRefreshAttempt = new Date().getTime();

  try {
    const response = await fetch(`/api/token_refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error("Refresh failed");
    }

    await setAuthenticationInfo(responseData);
    return responseData.accessToken;
  } catch {
    dispatchLogout();
    localStorage.removeItem("auth");
    navigateTo(routes.HOME);
  }
};

export function getTokenExpiry() {
  return getAuthenticatedUserInfo()?.exp;
}
