import { IProjectFile } from "@/store/slices/workspace.slice";
import { useEffect, useState } from "react";
import routes from "../constants/routes";

interface IRootStructure {
  [key: string]: IFile | IRootFolder;
}

export interface IFile {
  type: "file";
  file: IProjectFile;
}

export interface IRootFolder {
  size: number;
  count: number;
  files: IProjectFile[];
  type: "folder";
  subFolders?: IFolder;
}

export interface IFolder {
  [key: string]: IProjectFile[];
}

const useReceiverFolderStructure = (files: IProjectFile[] | undefined) => {
  const [folderMap, setFolderMap] = useState<IRootStructure>({});

  useEffect(() => {
    const folderData: IRootStructure = {};

    if (files) {
      for (const file of files) {
        const name = file.name || file.fileName || "";
        const paths = name.split("/");
        if (paths.length === 1) {
          folderData[paths[0]] = { type: "file", file };
        }

        const rootFolderName = paths.shift();
        const fileName = paths.pop();
        if (rootFolderName && fileName) {
          if (!folderData[rootFolderName]) {
            folderData[rootFolderName] = {
              files: [] as IProjectFile[],
              size: 0,
              count: 0,
              type: "folder",
            };
          }

          const subfolders = paths.join(routes.HOME);
          const rootFolder = folderData[rootFolderName] as IRootFolder;
          if (subfolders) {
            if (!rootFolder.subFolders) {
              rootFolder.subFolders = { [subfolders]: [] as IProjectFile[] };
            } else if (!rootFolder.subFolders[subfolders]) {
              rootFolder.subFolders[subfolders] = [] as IProjectFile[];
            }
            rootFolder.subFolders[subfolders].push({
              ...file,
            });
          } else {
            rootFolder.files.push({ ...file });
          }
          rootFolder.size = rootFolder.size + (file.size || file.fileSize);
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

export default useReceiverFolderStructure;
