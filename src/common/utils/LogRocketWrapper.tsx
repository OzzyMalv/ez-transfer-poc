"use client";
import { ENV_CONSTANTS } from "@/common/constants/env.const";
import { useAppSelector } from "@/store";
import { selectSenderSubmissionState } from "@/store/slices/senderForm.slice";
import { useEffect } from "react";
import LogRocket from "logrocket";

const LogRocketWrapper: React.FC<React.PropsWithChildren> = (props) => {
  const { senderInfo } = useAppSelector(selectSenderSubmissionState);

  useEffect(() => {
    if (ENV_CONSTANTS.LOGROCKET_ENABLED) {
      LogRocket.init(ENV_CONSTANTS.LOGROCKET_APP_ID);
      LogRocket.identify(ENV_CONSTANTS.LOGROCKET_APP_ID, {
        email: senderInfo?.email || "anonymous",
        id: senderInfo?.id || "anonymous",
      });
    }
  }, [senderInfo]);

  return <>{props.children}</>;
};

export default LogRocketWrapper;
