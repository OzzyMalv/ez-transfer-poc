import SenderUserAPIs from "@/api/services/senderUser.api";
import { useAppDispatch } from "@/store";
import { IProjectFile, setFilesStatus } from "@/store/slices/workspace.slice";
import { useEffect, useMemo, useRef, useState } from "react";
import { IFileWithPath } from "@/api/types/senderUser.types";

export interface IHandleUploadPrams {
  uploadURL: string;
  file: IFileWithPath | IBlobWithPath;
  isMultiPartUpload: boolean;
  name: string;
  partNumber?: number;
}

export interface IBlobWithPath extends Blob {
  path?: string;
  webkitRelativePath?: string;
}

const useFilesUpload = (
  folderId: string,
  files: IProjectFile[],
  abortController: AbortController,
) => {
  const dispatch = useAppDispatch();
  const [filesToUpload, setFilesToUpload] = useState<IProjectFile[]>([]);

  const progressRef = useRef<{ [key: string]: number }>({});

  const multipartRef = useRef<{
    [key: string]: { partNumber: number; partHash: string }[];
  }>({});

  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});

  const [progress, setProgress] = useState(0);

  const [uploadIds, setUploadIds] = useState<{ [key: string]: string }>({});

  const totalSize = useMemo(
    () => files.reduce((acc, curr) => acc + curr.fileSize, 0),
    [files],
  );

  const [uploadedFiles, setUploadedFiles] = useState<IProjectFile[]>([]);

  const handleFileUpload = async (file: IProjectFile | undefined) => {
    if (!file) return;

    const fileExists = uploadedFiles.some(
      (uploadedFile) => uploadedFile.id === file.id,
    );

    if (fileExists) return;

    setUploadedFiles((prev) => [...prev, file]);

    try {
      if (file.multipart && file.file) {
        const { parts, uploadId } = file.multipart;
        setUploadIds((prev) => ({ ...prev, [file.fileName]: uploadId }));

        await Promise.all(
          parts.map(async (part) => {
            const blob = file.file?.slice(
              part?.range.start,
              part?.range.end,
            ) as IBlobWithPath;
            blob.path = file.file?.path;

            const response = await SenderUserAPIs.UploadFileToS3Bucket(
              part.url,
              blob,
              (progressEvent) => {
                const progressInfo = { ...progressRef.current };
                progressInfo[`${file.fileName}_${part.partNumber}`] =
                  progressEvent.loaded;
                progressRef.current = progressInfo;
                setUploadProgress({ ...progressInfo });
              },
              abortController.signal,
            );

            const eTagHeader = response.headers.etag.replaceAll('"', "");

            const multipartInfo = { ...multipartRef.current };
            if (!multipartInfo[file.fileName]) {
              multipartInfo[file.fileName] = [];
            }
            multipartInfo[file.fileName].push({
              partNumber: part.partNumber,
              partHash: eTagHeader,
            });

            multipartRef.current = multipartInfo;
            setParts({ ...multipartInfo });
          }),
        );
      } else if (file?.url && file?.file) {
        await SenderUserAPIs.UploadFileToS3Bucket(
          file?.url,
          file?.file,
          (progressEvent) => {
            const progressInfo = { ...progressRef.current };
            progressInfo[`${file.fileName}`] = progressEvent.loaded;
            progressRef.current = progressInfo;
            setUploadProgress({ ...progressInfo });
          },
          abortController.signal,
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const uploadFiles = files.filter((file) => file.status === "Upload");
    if (uploadFiles.length > 0) {
      setFilesToUpload(uploadFiles);
    }
  }, [files]);

  useEffect(() => {
    const files = [...filesToUpload];

    if (files.length > 0) {
      dispatch(
        setFilesStatus({
          folderId,
          files: files.map((file) => ({
            ...file,
            status: "Uploading",
          })),
        }),
      );

      let index = files.length;
      while (index > 0) {
        const file = files.pop();
        handleFileUpload(file);
        index--;
      }
      setFilesToUpload([...files]);
    }
  }, [filesToUpload]);

  useEffect(() => {
    const totalProgress = Object.values(uploadProgress).reduce(
      (acc, curr) => acc + curr,
      0,
    );

    setProgress(Math.round((totalProgress * 100) / totalSize));
  }, [uploadProgress]);

  const [parts, setParts] = useState<{
    [key: string]: { partNumber: number; partHash: string }[];
  }>({});

  return {
    progress,
    uploadIds,
    parts: { ...parts },
    uploadedFiles,
  };
};

export default useFilesUpload;
