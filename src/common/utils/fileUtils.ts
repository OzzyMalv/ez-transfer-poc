import { Preview, QcReportType } from "@/api/types/receiverUser.types";
import { IFileWithPath } from "@/api/types/senderUser.types";
import { ProjectDataType } from "@/api/types/workspace.types";
import {
  currentMaxStorageLimitInBytes,
  FileExtensionSelector,
  isAnyDuplicateFolders,
  isAnyEmptyFiles,
  isAnyFilesPathsThatAreTooLong,
  isAnySameFileNamesInFileList,
} from "@/components/senderForm/senderForm.utils";
import { AppDispatch } from "@/store";
import { setError, setSelectedFiles } from "@/store/slices/senderForm.slice";
import {
  IProjectFile,
  requestNewProject,
  setBasicTransfer,
  setSubFolder,
} from "@/store/slices/workspace.slice";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FileWithPath } from "react-dropzone";
import routes from "@/common/constants/routes";
import { addProject } from "@/store/slices/workspaces.slice";
import { showNotify } from "@/store/slices/notification.slice";
import { TFunction } from "next-i18next";
import { navigateTo } from "./navigation";

export const toFixedNoRounding = (n: number): number => {
  return Math.floor(n * 100) / 100;
};

/**
 * Convert bytes in GB like limit 5000000000 -> 5
 * @param n {number}
 * @return {number}
 */
export const toFixedGB = (n: number): number => n / 1_000_000_000;

/**
 * Convert size to string
 * @param size {number}
 * @return string
 */
export const sizeAndUnitCalc = (size: number) => {
  const marker = 1000;
  const kiloBytes = marker;
  const megaBytes = marker * marker;
  const gigaBytes = marker * marker * marker;

  if (size < kiloBytes) return size + " Bytes";
  else if (size < megaBytes) return toFixedNoRounding(size / kiloBytes) + " KB";
  else if (size < gigaBytes) return toFixedNoRounding(size / megaBytes) + " MB";
  else return toFixedNoRounding(size / gigaBytes) + " GB";
};

export const removeLeadingSlash = (path: string | undefined) =>
  path?.replace(/^\//, ""); // The regex matches a leading slash);

const callShowError = {
  isFileSizeExceeds: (dispatch: AppDispatch) =>
    dispatch(
      setError({
        status: "visible",
        message: "message_dialog.error.fileSizeExceeds",
      }),
    ),
  isSomeFilesEmpty: (dispatch: AppDispatch) =>
    dispatch(
      setError({
        status: "visible",
        message: "message_dialog.error.someFilesEmpty",
      }),
    ),
  isSameFolderName: (dispatch: AppDispatch) =>
    dispatch(
      setError({
        status: "visible",
        message: "message_dialog.error.sameFolderName",
      }),
    ),
  isFilePathTooLong: (dispatch: AppDispatch) =>
    dispatch(
      setError({
        status: "visible",
        message: "message_dialog.error.filePathTooLong",
      }),
    ),
  isSameFileName: (dispatch: AppDispatch) =>
    dispatch(
      setError({
        status: "visible",
        message: "message_dialog.error.sameFileName",
      }),
    ),
};

const isHaveHidden = (path: string) =>
  path.startsWith(".") || path.includes("/.");

export const addFiles = (
  dispatch: AppDispatch,
  droppedFiles: IFileWithPath[],
  allFilesPaths: string[],
  existingFilesTotalSize: number,
  isLoggedInUser: boolean,
  maxStorageFeatureLimit: number,
) => {
  const droppedFilesArray = Array.from(droppedFiles || []).map((file) => {
    const fileWithPath: IFileWithPath = new File([file], file.name);
    fileWithPath.path = removeLeadingSlash(file.path);

    // For unit test
    Object.defineProperty(fileWithPath, "size", { value: file.size });
    return fileWithPath;
  });

  const filteredDroppedFiles = droppedFilesArray.filter(
    // file hidden or file inside hidden folder
    (file) => !isHaveHidden(file.path || file.name),
  );

  const droppedFilesTotalSize: number = filteredDroppedFiles.reduce(
    (totalSize, file) => totalSize + file.size,
    0,
  );

  // check size of files and check size for already added + new files
  const currentMaxFilesTransferSize = currentMaxStorageLimitInBytes(
    isLoggedInUser,
    maxStorageFeatureLimit,
  );
  if (
    droppedFilesTotalSize > currentMaxFilesTransferSize ||
    existingFilesTotalSize + droppedFilesTotalSize > currentMaxFilesTransferSize
  ) {
    callShowError.isFileSizeExceeds(dispatch);
    return;
  }

  // files that have file size of 0
  if (isAnyEmptyFiles(filteredDroppedFiles)) {
    callShowError.isSomeFilesEmpty(dispatch);
    return;
  }

  // Need to check folder that are duplicated, but we still need to check individual file names
  if (isAnyDuplicateFolders(filteredDroppedFiles, allFilesPaths)) {
    callShowError.isSameFolderName(dispatch);
    return;
  }

  if (isAnyFilesPathsThatAreTooLong(filteredDroppedFiles)) {
    callShowError.isFilePathTooLong(dispatch);
    return;
  }

  const combinedDirectoryAndFileNames = [
    ...allFilesPaths,
    ...(filteredDroppedFiles.map(
      (item) =>
        item?.path?.toLocaleLowerCase() ?? item?.name?.toLocaleLowerCase(),
    ) || []),
  ];

  if (isAnySameFileNamesInFileList(combinedDirectoryAndFileNames)) {
    callShowError.isSameFileName(dispatch);

    // add only uniq files
    const itemsWIthUniqNamesAndPaths = filteredDroppedFiles.filter(
      (item) =>
        !allFilesPaths.includes(
          item.path?.toLowerCase() ?? item.name.toLocaleLowerCase(),
        ),
    );
    dispatch(setSelectedFiles(itemsWIthUniqNamesAndPaths));
    return;
  }

  dispatch(setSelectedFiles(filteredDroppedFiles));
};

const IMAGE_FILES_EXTENSIONS = ["jpg", "jpeg", "png", "gif"];
const AUDIO_FILES_EXTENSIONS = ["mp3", "wav"];
const VIDEO_FILES_EXTENSIONS = ["mp4"];
const ZIP_FILE_EXTENSTION = "zip";
const FILE_ZIP_IS_HTML5AD = "File_Zip_Is_Html5Ad";

export const FILE_PREVIEW_TYPE = {
  IMAGE: "image",
  AUDIO: "audio",
  VIDEO: "video",
  HTML: "html",
  UNKNOWN: "unknown",
} as const;

export const getFilePreviewType = (
  fileName: string,
  preview: Preview,
  qcReport: QcReportType[],
) => {
  const originalFileExtenstion = FileExtensionSelector(fileName).toLowerCase();
  if (
    !!preview.largeThumbnailUrl &&
    IMAGE_FILES_EXTENSIONS.includes(originalFileExtenstion)
  ) {
    return FILE_PREVIEW_TYPE.IMAGE;
  }
  const isPreviewProxyExist = !!preview.smallProxyUrl;

  if (!isPreviewProxyExist) {
    return FILE_PREVIEW_TYPE.UNKNOWN;
  }

  const fileExtensionOfProxy = FileExtensionSelector(
    preview.smallProxyUrl!,
  ).toLowerCase();

  if (AUDIO_FILES_EXTENSIONS.includes(fileExtensionOfProxy)) {
    return FILE_PREVIEW_TYPE.AUDIO;
  } else if (VIDEO_FILES_EXTENSIONS.includes(fileExtensionOfProxy)) {
    return FILE_PREVIEW_TYPE.VIDEO;
  }

  if (
    originalFileExtenstion === ZIP_FILE_EXTENSTION &&
    qcReport.some(
      (report) => report.name === FILE_ZIP_IS_HTML5AD && report.value === true,
    )
  ) {
    return FILE_PREVIEW_TYPE.HTML;
  }

  return FILE_PREVIEW_TYPE.UNKNOWN;
};

export const addWorkspaceFiles = async (
  dispatch: AppDispatch,
  droppedFiles: FileWithPath[],
  workspaceId: string,
  rootFolderId: string,
  router: AppRouterInstance,
) => {
  const incomingFilesArray = handleDroppedFiles(dispatch, droppedFiles, []);
  if (incomingFilesArray) {
    await dispatch(
      requestNewProject({
        workspaceId,
        projectId: rootFolderId,
      }),
    )
      .unwrap()
      .then((project: ProjectDataType | undefined) => {
        dispatch(addProject(project));
        dispatch(setSubFolder({ ...project, files: incomingFilesArray }));
        dispatch(setBasicTransfer(true));
        router.push(
          `${routes.WORKSPACES}/${workspaceId}/project/${project?.id}`,
        );
      });
  }
};

export const handleDroppedFiles = (
  dispatch: AppDispatch,
  droppedFiles: FileWithPath[],
  files: IProjectFile[],
): IProjectFile[] | undefined => {
  const incomingFilesArray = Array.from(droppedFiles || [])
    .filter((file) => !isHaveHidden(file.path || file.name))
    .map((file) => {
      const fileWithPath: IFileWithPath = new File([file], file.name, {
        type: file.type,
        lastModified: file.lastModified,
      });

      if (file.path !== "") {
        fileWithPath.path = removeLeadingSlash(file.path);
      }

      if (file.webkitRelativePath !== "") {
        fileWithPath.path = file.webkitRelativePath;
      }

      //For unit test
      Object.defineProperty(fileWithPath, "size", { value: file.size });
      return {
        status: "New",
        file: fileWithPath,
        fileName: fileWithPath?.path ?? file.name,
        fileSize: file.size,
        preview: {},
        id: "",
        name: fileWithPath?.path ?? file.name,
        size: file.size,
      } as IProjectFile;
    });

  const isAnyEmptyFile = incomingFilesArray.some((file) => !file.file?.size);

  if (isAnyEmptyFile) {
    dispatch(
      showNotify({
        isOpen: true,
        message: "message_dialog.error.someFilesEmpty",
        type: "warning",
      }),
    );

    return;
  }

  const isAnyDuplicateFile = files.some((file) =>
    incomingFilesArray.some(
      (incomingFile) => file.name === incomingFile.fileName,
    ),
  );

  if (isAnyDuplicateFile) {
    dispatch(
      showNotify({
        isOpen: true,
        message: "message_dialog.error.sameFileName",
        type: "warning",
      }),
    );

    return;
  }

  const isAnyFilesPathsThatAreTooLong = incomingFilesArray.some(
    (file) => file.name.length > 255,
  );

  if (isAnyFilesPathsThatAreTooLong) {
    dispatch(
      showNotify({
        isOpen: true,
        message: "message_dialog.error.filePathTooLong",
        type: "warning",
      }),
    );
    return;
  }

  return incomingFilesArray;
};

export const filesAndSize = (amount: number, size: number, t: TFunction) => {
  let fileLabel = "";
  if (amount < 1) {
    fileLabel = t("card.number.zero.files");
  } else if (amount === 1) {
    fileLabel = t("card.number.file");
  } else {
    fileLabel = t("card.number.files", { amount });
  }

  const allFilesAndSizeLabel = `${fileLabel} • ${sizeAndUnitCalc(size || 0)}`;

  return allFilesAndSizeLabel;
};

export const destroySession = async () => {
  try {
    const response = await fetch(`/api/destroy_session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData === "success") {
      document.cookie = "vwo_logged_in=false";
      return navigateTo(routes.HOME);
    }
  } catch {
    console.log("System Failure");
  }
};
