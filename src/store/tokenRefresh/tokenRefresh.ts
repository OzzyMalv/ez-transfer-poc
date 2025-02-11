import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getTokenRefreshPeriod } from "@/auth/auth.utils";
import {
  setAuthToken,
  logout,
  setRefreshTokenLoading,
} from "../slices/auth.slice";
import { navigateTo } from "@/common/utils/navigation";
import routes from "@/common/constants/routes";

let tokenRefreshTimeout: NodeJS.Timeout | null = null;
const AUTH_KEY = "auth";

const tokenRefreshMiddleware: Middleware<object, RootState> =
  (store) => (next) => (action) => {
    const startTokenRefresh = () => {
      const milliseconds = getTokenRefreshPeriod();

      tokenRefreshTimeout = setTimeout(async () => {
        if (store.getState().auth.isLoggedIn) {
          try {
            store.dispatch(setRefreshTokenLoading(true));
            const response = await fetch(`/api/token_refresh`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            });

            const responseData = await response.json();
            if (!response.ok) {
              throw new Error("Refresh Failed");
            }

            store.dispatch(setAuthToken(responseData));
            store.dispatch(setRefreshTokenLoading(false));
          } catch {
            store.dispatch(logout());
            store.dispatch(setRefreshTokenLoading(false));
            localStorage.removeItem(AUTH_KEY);
            document.cookie = "vwo_logged_in=false";
            return navigateTo(routes.HOME);
          }
        }
      }, milliseconds);
    };

    const stopTokenRefresh = () => {
      if (tokenRefreshTimeout) {
        clearTimeout(tokenRefreshTimeout);
        tokenRefreshTimeout = null;
      }
    };

    switch (action.type) {
      case "[authSlice]/loginSuccess":
      case "[authSlice]/setAuthToken":
        startTokenRefresh();
        break;

      case "[authSlice]/logout":
        stopTokenRefresh();
        break;
    }
    return next(action);
  };

export default tokenRefreshMiddleware;
