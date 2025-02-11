import { File, IRequestAnalyseFilesInfo } from "@/api/types/receiverUser.types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const useAnalyseFiles = (files: File[] | undefined) => {
  const params = useParams();
  const [qcFiles, setQCFiles] = useState<IRequestAnalyseFilesInfo | null>(null);
  const receiver = params?.receiver;
  const fileId = receiver?.[5] || null;

  useEffect(() => {
    const receiverId = receiver?.[1] || "";
    const fileSetSessionId = receiver?.[3] || "";

    const qcProfileFiles =
      files
        ?.filter(
          (file) =>
            file.qc?.availableProfiles?.length > 0 &&
            (file.qc?.results || file.qc?.result?.report).length === 0,
        )
        .map((file) => {
          return {
            id: file.fileId,
            qc: {
              profiles: file.qc?.availableProfiles,
            },
          };
        }) || [];
    setQCFiles({ receiverId, fileSetSessionId, files: qcProfileFiles });
  }, [fileId]);

  return { qcAnalyseFiles: qcFiles };
};

export default useAnalyseFiles;
