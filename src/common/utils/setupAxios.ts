import axios, { AxiosRequestConfig } from "axios";
import { ENV_CONSTANTS } from "@/common/constants/env.const";
import { getAuthenticatedUserInfo, updateToken } from "@/auth/auth";
import { formattedShortUrl } from "./setCurrentUrl";
import { securePages } from "../constants/pageSpecifics";
import { destroySession } from "./fileUtils";

type QueuedRequest = {
  resolve: (config: AxiosRequestConfig) => void;
  reject: (error: unknown) => void;
};

let isRefreshingToken = false;
let failedQueue: QueuedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve({
        headers: { Authorization: `Bearer ${token}` },
      } as AxiosRequestConfig);
    }
  });
  failedQueue = [];
};

export function setupAxiosInterceptor(
  dispatchLogout: () => void,
  interceptorIdRef: React.MutableRefObject<number | null>,
  pathname: string,
) {
  if (interceptorIdRef.current !== null) {
    axios.interceptors.request.eject(interceptorIdRef.current);
  }
  const formattedPath = formattedShortUrl(pathname);

  // if (!getAuthenticatedUserInfo() && securePages.includes(formattedPath)) {
  //   destroySession();
  // }

  interceptorIdRef.current = axios.interceptors.request.use(
    (config) => {
      // if (!getAuthenticatedUserInfo() && securePages.includes(formattedPath)) {
      //   destroySession();
      // }
      const token = getAuthenticatedUserInfo()?.accessToken;
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        (error.response?.status === 401 || error.response?.status === 403) &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        if (isRefreshingToken) {
          return new Promise<AxiosRequestConfig>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((config: AxiosRequestConfig) => {
              if (config.headers?.Authorization) {
                originalRequest.headers["Authorization"] =
                  config.headers.Authorization;
              }
              return axios(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        isRefreshingToken = true;

        try {
          const newToken = await updateToken(dispatchLogout); // Get the token directly
          processQueue(null, newToken); // Pass the token to queued requests
          if (newToken) {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          }
          return axios(originalRequest); // Retry the original request
        } catch (err) {
          processQueue(err, null);
          return Promise.reject(err);
        } finally {
          isRefreshingToken = false;
        }
      }

      return Promise.reject(error);
    },
  );
}

export const setAxiosBaseUrl = () => {
  axios.defaults.baseURL = ENV_CONSTANTS.API_BASEURL;
  let token = ENV_CONSTANTS.DEFAULT_API_BEARER_TOKEN;
  if (typeof localStorage !== "undefined") {
    const auth = getAuthenticatedUserInfo();
    token = auth?.accessToken ?? token;
  }

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const setAxiosAccessToken = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
