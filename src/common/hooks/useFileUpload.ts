import {
  ICreateFilesetSessionResponse,
  IFile,
  IFileWithPath,
} from "@/api/types/senderUser.types";
import { isRefreshRequired } from "@/auth/auth";
import { ENV_CONSTANTS } from "@/common/constants/env.const";

import { useState, useEffect } from "react";
import { FileWithPath } from "react-dropzone";
import { updateToken } from "@/auth/auth";

interface IHandleUploadPrams {
  uploadURL: string;
  file: IFileWithPath | IBlobWithPath;
  isMultiPartUpload: boolean;
  name: string;
  partNumber?: number;
}
interface IBlobWithPath extends Blob {
  path?: string;
  webkitRelativePath?: string;
}

interface IUploadQueue extends IFile {
  file: FileWithPath;
}

interface IuseFileUpload {
  handleFileUpload: (params: IHandleUploadPrams) => void;
  filesetSession: ICreateFilesetSessionResponse | null;
  selectedFiles: FileWithPath[];
  dispatchLogout: () => void;
}

const useFileUpload = (props: IuseFileUpload) => {
  const { handleFileUpload, filesetSession, selectedFiles, dispatchLogout } =
    props;
  const [uploadQueue, setUploadQueue] = useState<IUploadQueue[]>([]);
  const [activeUploadCount, setActiveUploadCount] = useState(0);

  useEffect(() => {
    if (filesetSession?.files) {
      const tempUploadQueue = filesetSession.files.map((x) => {
        const file = selectedFiles.find(
          (y) => (y.path ? y.path : y.name) === x.name,
        )!;
        return { ...x, file };
      });

      setUploadQueue(tempUploadQueue);
    }
  }, [filesetSession]);

  // Control upload files to s3
  useEffect(() => {
    if (
      activeUploadCount < parseInt(ENV_CONSTANTS.MAXIMUM_ACTIVE_UPLOADS) &&
      uploadQueue.length
    ) {
      const tempUploadQueue = [...uploadQueue];
      let queue = tempUploadQueue.shift();
      let isMultiPartUpload = false;

      (async () => {
        try {
          if (queue) {
            if (isRefreshRequired()) {
              updateToken(dispatchLogout);
            }
            setActiveUploadCount((prevCount) => prevCount + 1);
            if (queue.multipart) {
              isMultiPartUpload = true;

              const parts = [...queue.multipart.parts];
              const part = parts.shift();
              if (part && queue.file) {
                const blob = queue.file.slice(
                  part?.range.start,
                  part?.range.end,
                ) as IBlobWithPath;
                blob.path = queue.file.path;
                if (parts.length) {
                  const multipart = { ...queue.multipart, parts };
                  queue = { ...queue, multipart };
                  tempUploadQueue.push(queue);
                }
                handleFileUpload({
                  uploadURL: part?.url,
                  file: blob,
                  isMultiPartUpload,
                  name: queue.name,
                  partNumber: part.partNumber,
                });
              }
            } else {
              handleFileUpload({
                uploadURL: queue.url,
                file: queue.file,
                isMultiPartUpload,
                name: queue.name,
              });
            }
            setUploadQueue([...tempUploadQueue]);
          }
        } catch (error) {
          console.log(error, queue);
        }
      })();
    }
  }, [uploadQueue, activeUploadCount]);

  return {
    setActiveUploadCount,
    setUploadQueue,
  };
};

export default useFileUpload;
