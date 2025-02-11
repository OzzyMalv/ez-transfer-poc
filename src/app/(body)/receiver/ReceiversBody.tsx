"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import {
  requestReceiverFiles,
  selectIsLoading,
  selectReceiverFileSetSession,
  setReceiverFileSetSession,
  setReceiverSessionInfo,
} from "@/store/slices/receiver.slice";
import { selectQcFirst } from "@/store/slices/senderForm.slice";
import { useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  IReceiverFileSetSessionInfoResponse,
  IReceiverSessionInfoResponse,
} from "@/api/types/receiverUser.types";
import { MainWrapper, ResponsiveContainer } from "@/app/(pages)/page.styles";
import { MainPreviewWrapper } from "@/app/(body)/receiver/receivers.styles";
import { selectIsLoggedIn, setShowLoginModal } from "@/store/slices/auth.slice";
import { ENV_CONSTANTS } from "@/common/constants/env.const";
import routes from "@/common/constants/routes";
import { usePathname, useRouter } from "next/navigation";

const ReceiverSummeryView = dynamic(() => import("@/views/summery.view"));
const ReceiverFilesView = dynamic(() => import("@/views/sessionFiles.view"));
const FilePreviewView = dynamic(() => import("@/views/FilePreview.view"));

export interface IReceiversLandingBodyProps {
  filesSessionInfo: IReceiverSessionInfoResponse;
  receiverId: string;
  fileSetSessionId: string;
  directFileId?: string;
  sessionFiles?: IReceiverFileSetSessionInfoResponse | null;
}

const ReceiversBody = ({
  filesSessionInfo,
  receiverId,
  fileSetSessionId,
  directFileId,
  sessionFiles,
}: IReceiversLandingBodyProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const sessionFilesFromState = useAppSelector(selectReceiverFileSetSession);
  const isQcFirst = useAppSelector(selectQcFirst);
  const router = useRouter();
  const pathname = usePathname();

  const isUserLoggedIn = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(setShowLoginModal(!isUserLoggedIn));
  }, []);

  useEffect(() => {
    // go to view with "continue" only if no data
    if (sessionFilesFromState === null) {
      dispatch(setReceiverFileSetSession(sessionFiles));
    }
  }, []);

  useEffect(() => {
    dispatch(setReceiverSessionInfo(filesSessionInfo));
  }, [filesSessionInfo]);

  useEffect(() => {
    // immediate call for files
    if (isQcFirst && !filesSessionInfo.isPasswordProtected) {
      dispatch(
        requestReceiverFiles({
          receiverId,
          fileSetSessionId,
          password: "",
          isSkipLoading: false,
        }),
      );
    }
  }, [isQcFirst]);

  const onConfirmContinue = (password: string) => {
    if (ENV_CONSTANTS.FEATURE_PRIVATE_WORKSPACE_ENABLED) {
      const projectId = pathname.substring(pathname.lastIndexOf("/") + 1);
      return router.push(`${routes.RECEIVED_TRANSFERS}/${projectId}`);
    }
    dispatch(
      requestReceiverFiles({
        receiverId,
        fileSetSessionId,
        password,
        isSkipLoading: true,
      }),
    );
  };

  const DisplayComponent = useCallback(() => {
    if (!sessionFilesFromState) {
      return (
        <ResponsiveContainer maxWidth="xl">
          <ReceiverSummeryView
            data={filesSessionInfo}
            setConfirm={onConfirmContinue}
          />
        </ResponsiveContainer>
      );
    }
    return <ReceiverFilesView />;
  }, [sessionFilesFromState, directFileId]);

  if (isLoading) {
    return <></>;
  }

  if (sessionFilesFromState && directFileId) {
    const pickFile = sessionFilesFromState.files.find(
      (file) => `${file.fileId}` === directFileId,
    );

    const fileList = sessionFilesFromState.files.map((s) => s.fileId);

    // do not allow open preview if proxy didn't generate
    if (!pickFile) {
      // todo show something if this id doesn't belong here
      return <></>;
    }
    return (
      <MainPreviewWrapper data-testid="dti-receivers-main-preview-file">
        <FilePreviewView fileData={pickFile} fileList={fileList} />
      </MainPreviewWrapper>
    );
  }

  return (
    <MainWrapper data-testid="dti-receivers-side">
      {DisplayComponent()}
    </MainWrapper>
  );
};

export default ReceiversBody;
