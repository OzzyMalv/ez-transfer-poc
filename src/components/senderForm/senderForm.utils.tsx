"use client";

import { IFileWithPath } from "@/api/types/senderUser.types";
import routes from "@/common/constants/routes";
import {
  ArticleOutlined,
  AudiotrackRounded,
  FolderOpenRounded,
  FolderZipOutlined,
  ImageOutlined,
  PlayArrowRounded,
  InsertDriveFileOutlined,
} from "@mui/icons-material";
import { FileWithPath } from "react-dropzone";

export const FolderIconSelectorNew = () => {
  return <img src="/img/icons/folder.svg" alt="" />;
};

export const FolderIconSelector = () => {
  return <FolderOpenRounded />;
};

// todo colors suppose to be different every time later
export const colorIconSelector = (extension: string) => {
  switch (extension) {
    case "zip":
      return "#A2E1E1";
    case "pdf":
      return "#FED8EF";
    case "mp3":
      return "#44F4D9";
    case "jpeg":
      return "#2BD3B6";

    default:
      return "#FED8EF";
  }
};

export const IconSelector = (extension: string, useColor: boolean) => {
  const currentVariant = useColor ? "colored" : "default";

  const audioIcon = {
    colored: <img src="/img/illustrations/audio.svg" alt="" />,
    default: <AudiotrackRounded />,
  };
  const documentIcon = {
    colored: <img src="/img/illustrations/document.svg" alt="" />,
    default: <ArticleOutlined />,
  };
  const folderIcon = {
    colored: <img src="/img/illustrations/folder.svg" alt="" />,
    default: <FolderOpenRounded />,
  };
  const imageIcon = {
    colored: <img src="/img/illustrations/image.svg" alt="" />,
    default: <ImageOutlined />,
  };
  const videoIcon = {
    colored: <img src="/img/illustrations/video.svg" alt="" />,
    default: <PlayArrowRounded />,
  };
  const zipIcon = {
    colored: <img src="/img/illustrations/zip.svg" alt="" />,
    default: <FolderZipOutlined />,
  };
  const fontIcon = {
    colored: <img src="/img/illustrations/Font_colored.svg" alt="" />,
    default: <img src="/img/illustrations/Font.svg" alt="" />,
  };
  const codeBlockIcon = {
    colored: <img src="/img/illustrations/code_blocks_colored.svg" alt="" />,
    default: <img src="/img/illustrations/code_blocks.svg" alt="" />,
  };
  const svgIcon = {
    colored: <img src="/img/illustrations/svg_colored.svg" alt="" />,
    default: <img src="/img/illustrations/svg.svg" alt="" />,
  };
  const afterEffectIcon = {
    colored: <img src="/img/illustrations/AE_colored.svg" alt="" />,
    default: <img src="/img/illustrations/AE.svg" alt="" />,
  };
  const illustratorIcon = {
    colored: <img src="/img/illustrations/AI_colored.svg" alt="" />,
    default: <img src="/img/illustrations/AI.svg" alt="" />,
  };
  const figmaIcon = {
    colored: <img src="/img/illustrations/Figma_colored.svg" alt="" />,
    default: <img src="/img/illustrations/Figma.svg" alt="" />,
  };
  const inDesignIcon = {
    colored: <img src="/img/illustrations/ID_colored.svg" alt="" />,
    default: <img src="/img/illustrations/ID.svg" alt="" />,
  };
  const lightRoomIcon = {
    colored: <img src="/img/illustrations/PSLight_colored.svg" alt="" />,
    default: <img src="/img/illustrations/PSLight.svg" alt="" />,
  };
  const photoshopIcon = {
    colored: <img src="/img/illustrations/PS_colored.svg" alt="" />,
    default: <img src="/img/illustrations/PS.svg" alt="" />,
  };
  const adobeProIcon = {
    colored: <img src="/img/illustrations/APPro_colored.svg" alt="" />,
    default: <img src="/img/illustrations/APPro.svg" alt="" />,
  };

  switch (extension.toLowerCase()) {
    case "aac":
    case "cda":
    case "mid":
    case "midi":
    case "mp3":
    case "oga":
    case "opus":
    case "wav":
    case "weba":
      return audioIcon[currentVariant];

    case "abw":
    case "csv":
    case "doc":
    case "docx":
    case "odp":
    case "ods":
    case "odt":
    case "pdf":
    case "ppt":
    case "pptx":
    case "rtf":
    case "txt":
    case "xls":
    case "xlsx":
    case "xml":
    case "xul":
      return documentIcon[currentVariant];

    case "arc":
      return folderIcon[currentVariant];

    case "avif":
    case "bmp":
    case "gif":
    case "ico":
    case "jpeg":
    case "jpg":
    case "png":
    case "tiff":
    case "tif":
    case "webp":
      return imageIcon[currentVariant];

    case "avi":
    case "mov":
    case "mp4":
    case "mpg":
    case "mpeg":
    case "mxf":
    case "ogv":
    case "ts":
    case "webm":
    case "3gp":
    case "3g2":
      return videoIcon[currentVariant];

    case "bz":
    case "bz2":
    case "gz":
    case "rar":
    case "zip":
    case "7zip":
    case "7z":
    case "tar":
      return zipIcon[currentVariant];

    case "eot":
    case "otf":
    case "ttf":
    case "woff":
    case "woff2":
      return fontIcon[currentVariant];

    case "csh":
    case "css":
    case "html":
    case "htm":
    case "jar":
    case "js":
    case "json":
    case "jsonld":
    case "mjs":
    case "mpkg":
    case "php":
    case "sh":
    case "xhtml":
      return codeBlockIcon[currentVariant];

    case "svg":
      return svgIcon[currentVariant];

    case "ae":
      return afterEffectIcon[currentVariant];

    case "ai":
      return illustratorIcon[currentVariant];

    case "fig":
      return figmaIcon[currentVariant];

    case "ind":
      return inDesignIcon[currentVariant];

    case "lr":
      return lightRoomIcon[currentVariant];

    case "psd":
      return photoshopIcon[currentVariant];

    case "pr":
      return adobeProIcon[currentVariant];

    default:
      break;
  }

  return <InsertDriveFileOutlined />;
};

export const FileExtensionSelector = (name: string) => {
  const lastIndexOfDot = name.lastIndexOf(".");
  if (lastIndexOfDot !== -1) {
    const fileExtension = name.substring(lastIndexOfDot + 1, name.length);
    return fileExtension;
  }

  return "";
};

export const DEFAULT_MAX_EXPIRY_DAYS = 14;
export const MAX_SIZE_FILES_BYTES = 2 * 1000 * 1000 * 1000; // 2GB in bytes

export const currentMaxStorageLimitInBytes = (
  isLoggedInUser: boolean,
  maxStorageLimit: number,
) => {
  if (isLoggedInUser) {
    return maxStorageLimit;
  }
  return MAX_SIZE_FILES_BYTES;
};

export const isAnySameFileNamesInFileList = (fileNames: string[]): boolean =>
  fileNames.some(function (item) {
    return fileNames.indexOf(item) !== fileNames.lastIndexOf(item);
  });

export const isAnyDuplicateFolders = (
  incomingFiles: FileWithPath[],
  existingFiles: string[],
): boolean => {
  const existingPathsWithSlash = existingFiles.filter(
    (path) => path?.includes(routes.HOME),
  );

  const existingPaths = existingPathsWithSlash.map((fileName) => {
    const firstSlash = fileName.indexOf(routes.HOME, 1);
    return fileName.toLocaleLowerCase().substring(1, firstSlash);
  });

  return incomingFiles.some((item) => {
    if (!item.path?.includes(routes.HOME)) {
      return false;
    }
    const firstSlash = item.path?.indexOf(routes.HOME, 1);
    const path = item.path?.toLocaleLowerCase().substring(1, firstSlash);
    return existingPaths.includes(path);
  });
};

export const isAnyFilesPathsThatAreTooLong = (
  incomingFiles: IFileWithPath[],
): boolean =>
  incomingFiles.some((file) => (file.path?.length ?? file.name.length) > 255);

export const isAnyEmptyFiles = (incomingFiles: IFileWithPath[]): boolean =>
  incomingFiles.some((file) => !file.size);
