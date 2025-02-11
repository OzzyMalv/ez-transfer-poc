import {
  File,
  IReceivedRequestAnalyseFilesInfo,
} from "@/api/types/receivedTransfers.types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const useAnalyseReceivedFiles = (files: File[] | undefined) => {
  const params = useParams();
  const [qcFiles, setQCFiles] =
    useState<IReceivedRequestAnalyseFilesInfo | null>(null);
  const receivedTransferId = params?.receivedTransferId;
  const filesLength = files?.length || 0;

  useEffect(() => {
    const filesetSessionId = (receivedTransferId as string) || "";
    const qcProfileFiles =
      files
        ?.filter(
          (file) =>
            file.qc.availableProfiles.length > 0 &&
            file?.qc?.profiles &&
            file?.qc?.profiles?.length === 0,
        )
        .map((file) => {
          return {
            fileKey: file.fileKey,
            qc: {
              profiles: file.qc.availableProfiles?.map((profile) => {
                return {
                  name: profile,
                };
              }),
            },
          };
        }) || [];
    setQCFiles({ filesetSessionId, files: qcProfileFiles });
  }, [filesLength]);

  return { qcAnalyseFiles: qcFiles };
};

export default useAnalyseReceivedFiles;
