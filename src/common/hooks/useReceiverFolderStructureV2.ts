import { useEffect, useState } from "react";
import routes from "@/common/constants/routes";
import { File } from "@/api/types/receivedTransfers.types";

interface IRootStructure {
  [key: string]: IFile | IRootFolder;
}

export interface IFile {
  type: "file";
  file: File;
}

export interface IRootFolder {
  size: number;
  count: number;
  files: File[];
  type: "folder";
  subFolders?: IFolder;
}

export interface IFolder {
  [key: string]: File[];
}

const useReceiverFolderStructureV2 = (files: File[] | undefined) => {
  const [folderMap, setFolderMap] = useState<IRootStructure>({});

  useEffect(() => {
    const folderData: IRootStructure = {};

    if (files) {
      for (const file of files) {
        const name = file.name || "";
        const paths = name.split("/");
        if (paths.length === 1) {
          folderData[paths[0]] = { type: "file", file };
        }

        const rootFolderName = paths.shift();
        const fileName = paths.pop();
        if (rootFolderName && fileName) {
          if (!folderData[rootFolderName]) {
            folderData[rootFolderName] = {
              files: [] as File[],
              size: 0,
              count: 0,
              type: "folder",
            };
          }

          const subfolders = paths.join(routes.HOME);
          const rootFolder = folderData[rootFolderName] as IRootFolder;
          if (subfolders) {
            if (!rootFolder.subFolders) {
              rootFolder.subFolders = { [subfolders]: [] as File[] };
            } else if (!rootFolder.subFolders[subfolders]) {
              rootFolder.subFolders[subfolders] = [] as File[];
            }
            rootFolder.subFolders[subfolders].push({ ...file, name: fileName });
          } else {
            rootFolder.files.push({ ...file, name: fileName });
          }
          rootFolder.size = rootFolder.size + (file?.size ?? file?.size ?? 0);
          rootFolder.count = rootFolder.count + 1;
        }
      }
    }
    setFolderMap(folderData);
  }, [files]);

  return {
    folderStructure: folderMap,
  };
};

export default useReceiverFolderStructureV2;
