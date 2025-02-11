"use client";

import { FC, ReactElement, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Theme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectReceiverConfirmedOrLoading } from "@/store/slices/receiver.slice";
import { withTransientProps } from "@/styles/theme";
import styled from "@emotion/styled";
import {
  logout,
  requestUserInfo,
  selectUserEmail,
} from "@/store/slices/auth.slice";
import {
  isAuthenticated,
  isRefreshRequired,
  setAuthenticationInfo,
} from "@/auth/auth";
import { setupAxiosInterceptor } from "@/common/utils/setupAxios";
import { setAxiosBaseUrl } from "@/common/utils/axiosUtils";
import routes from "@/common/constants/routes";
import { navigateTo } from "@/common/utils/navigation";
import { fetchErrorHandler } from "@/common/utils/nextErrorHandler";
import axios from "axios";
import Header from "@/components/shared/headers/Header";
import BackgroundContainer from "@/components/shared/BackgroundContainer";
import LoadingOverlay from "@/components/shared/LoadingOverlay";
import NotificationSnack from "./shared/NotificationSnack";

interface Props {
  children: ReactElement;
}

const bgColor = (theme: Theme, route: string, path: string) => {
  if (path?.includes("/project/")) {
    return theme.palette.background.paper;
  }

  const mapper = {
    [routes.HOME]: "#ffffff",
    [routes.ERROR]: "#EDEEEB",
    [routes.ACCOUNT]: "#FFF",
    [routes.ACCOUNT_RESET_PASSWORD_SENT]: "#FFF",
    [routes.ACCOUNT_PREFERENCES]: "#FFF",
    [routes.CHECKOUT]: "#FFF",
    [routes.CHECKOUT_SUCCESS]: "#eee2fb",
    [routes.UPLOAD]: "#F3F5F7",
    [routes.SUCCESS]: "#F2F2F2",
    [routes.EXPIRED]: "#F2F2F2",
    [routes.PRICING]: "#F2F2F2",
    [routes.VIRUS_DETECTED]: "#F3F5F7",
    [routes.WORKSPACES]: theme.palette.background.paper,
    [routes.ACCOUNT_PLANS]: "#FFF",
  };

  return mapper[route as keyof typeof mapper] || "#F2F2F2";
};

interface ContainerProps {
  $route: string;
  $path: string;
  $isReceiverConfirmed: boolean;
}

export const Container = styled("div", withTransientProps)<ContainerProps>`
  background-color: ${(p) => bgColor(p.theme, p.$route, p.$path)};
  height: 100dvh;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: -1;
  display: flex;
  overflow-y: auto;
`;

const PAGES_WITHOUT_HEADER = ["/404", routes.ERROR, routes.WORKSPACES, "/"];
const EXCLUDED_FILE_PREVIEW = "files";

const LayoutAppRouter: FC<Props> = ({ children }) => {
  const pathname = usePathname() || "";
  const dispatch = useAppDispatch();
  const [appReady, setAppReady] = useState(false);
  const isReceiverConfirmedOrLoading = useAppSelector(
    selectReceiverConfirmedOrLoading,
  );
  //Temp FE Redirect Awaiting Middleware Fix

  const userEmail = useAppSelector(selectUserEmail);

  const isPreviewFilePage = pathname
    .split(routes.HOME)
    .includes(EXCLUDED_FILE_PREVIEW);

  const isHeaderHidden =
    PAGES_WITHOUT_HEADER.includes(pathname) ||
    isPreviewFilePage ||
    pathname.includes("/project/") ||
    pathname.includes(routes.RECEIVED_TRANSFERS) ||
    pathname.includes(routes.ACCOUNT);

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    (async () => {
      if (isRefreshRequired() && isAuthenticated()) {
        try {
          const response = await fetch(`/api/token_refresh`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const responseData = await response.json();

          if (!response.ok) {
            throw fetchErrorHandler(responseData);
          }

          await setAuthenticationInfo(responseData);
          setAppReady(true);
        } catch {
          localStorage.removeItem("auth");
          dispatch(logout());
          document.cookie = "vwo_logged_in=false";
          return navigateTo(routes.HOME);
        }
        await dispatch(requestUserInfo());
      } else if (!userEmail && isAuthenticated() && !isRefreshRequired()) {
        setAppReady(true);
        await dispatch(requestUserInfo());
      } else {
        setAppReady(true);
      }
    })();
  }, [userEmail]);

  const dispatchLogout = () => {};

  setAxiosBaseUrl();

  const interceptorIdRef = useRef<number | null>(null); // Initialize with null

  useEffect(() => {
    if (appReady) {
      setupAxiosInterceptor(dispatchLogout, interceptorIdRef, pathname);
      return () => {
        if (interceptorIdRef.current !== null) {
          axios.interceptors.request.eject(interceptorIdRef.current);
        }
      };
    }
  }, [appReady, pathname]);

  return (
    <Container
      $route={pathname}
      $path={pathname}
      $isReceiverConfirmed={isReceiverConfirmedOrLoading}
    >
      {appReady ? (
        <>
          <BackgroundContainer>
            {!isHeaderHidden && <Header />}
            {children}
          </BackgroundContainer>
        </>
      ) : (
        <LoadingOverlay open />
      )}
      <NotificationSnack />
    </Container>
  );
};

export default LayoutAppRouter;
