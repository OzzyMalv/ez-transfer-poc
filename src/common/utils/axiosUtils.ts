import axios, { AxiosInstance } from "axios";
import { getAuthenticatedUserInfo } from "@/auth/auth";
import { ENV_CONSTANTS } from "../constants/env.const";

export const setAxiosAccessToken = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const setAxiosBaseUrl = () => {
  axios.defaults.baseURL = ENV_CONSTANTS.API_BASEURL;
  let token = ENV_CONSTANTS.DEFAULT_API_BEARER_TOKEN;
  if (typeof localStorage !== "undefined") {
    const auth = getAuthenticatedUserInfo();
    token = auth?.accessToken ?? token;
  }

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

let s3UploadInstance: AxiosInstance | null = null;
const MAX_REQUESTS_COUNT = parseInt(ENV_CONSTANTS.MAXIMUM_ACTIVE_UPLOADS);
let PENDING_REQUESTS = 0;

export function getS3UploadInstance() {
  if (s3UploadInstance !== null) {
    return s3UploadInstance;
  }

  s3UploadInstance = axios.create({});

  const requestQueue: (() => void)[] = [];

  s3UploadInstance.interceptors.request.use((config) => {
    return new Promise((resolve) => {
      const processQueue = () => {
        if (PENDING_REQUESTS < MAX_REQUESTS_COUNT) {
          PENDING_REQUESTS++;
          resolve(config);
        } else {
          requestQueue.push(processQueue);
        }
      };
      processQueue();
    });
  });

  s3UploadInstance.interceptors.response.use(
    function (response) {
      PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);
      if (requestQueue.length > 0) {
        const nextRequest = requestQueue.shift();
        if (nextRequest) nextRequest();
      }
      return Promise.resolve(response);
    },
    function (error) {
      PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);
      if (requestQueue.length > 0) {
        const nextRequest = requestQueue.shift();
        if (nextRequest) nextRequest();
      }
      return Promise.reject(error);
    },
  );

  return s3UploadInstance;
}
