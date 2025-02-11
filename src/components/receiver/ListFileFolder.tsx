import useReceiverFolderStructure, {
  IFile,
  IRootFolder,
} from "@/common/hooks/useReceiverFolderStructure";
import { IProjectFile } from "@/store/slices/workspace.slice";
import { Box } from "@mui/material";
import { FC } from "react";
import MemoizedFileListItem from "./MemoizedFileListItem";
import MemoizedFolderListItem from "./MemoizedFolderListItem";

interface IListFileFolderProps {
  files: IProjectFile[];
  workspaceId: string;
  folderId: string;
}
const ListFileFolder: FC<IListFileFolderProps> = ({
  files,
  workspaceId,
  folderId,
}) => {
  const { folderStructure } = useReceiverFolderStructure(files);

  const renderFolderAndFiles = Object.keys(folderStructure).map((name) => {
    if (folderStructure[name].type === "file") {
      const file = (folderStructure[name] as IFile).file;
      return (
        <MemoizedFileListItem
          key={name}
          item={file}
          workspaceId={workspaceId}
          folderId={folderId}
        />
      );
    } else {
      const folderMap = folderStructure[name] as IRootFolder;
      return (
        <MemoizedFolderListItem
          key={name}
          name={name}
          folderMap={folderMap}
          workspaceId={workspaceId}
          folderId={folderId}
        />
      );
    }
  });

  return (
    <Box display="flex" gap={1.5} flexDirection="column">
      {renderFolderAndFiles}
    </Box>
  );
};

export default ListFileFolder;
