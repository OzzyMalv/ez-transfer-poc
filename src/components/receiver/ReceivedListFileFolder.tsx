import { Box } from "@mui/material";
import { FC } from "react";

import { File } from "@/api/types/receivedTransfers.types";
import useReceiverFolderStructureV2, {
  IFile,
  IRootFolder,
} from "@/common/hooks/useReceiverFolderStructureV2";
import ReceivedMemoizedFileListItem from "@/components/receiver/ReceivedMemoizedFileListItem";
import ReceivedMemoizedFolderListItem from "@/components/receiver/ReceivedMemoizedFolderListItem";

interface IListFileFolderProps {
  files: File[];
}
const ReceivedListFileFolder: FC<IListFileFolderProps> = ({ files }) => {
  const { folderStructure } = useReceiverFolderStructureV2(files);

  const renderFolderAndFiles = Object.keys(folderStructure).map((name) => {
    if (folderStructure[name].type === "file") {
      const file = (folderStructure[name] as IFile).file;
      return <ReceivedMemoizedFileListItem key={name} item={file} />;
    } else {
      const folderMap = folderStructure[name] as IRootFolder;
      return (
        <ReceivedMemoizedFolderListItem
          key={name}
          name={name}
          folderMap={folderMap}
        />
      );
    }
  });

  return (
    <Box display="flex" gap={1.5} flexDirection="column" paddingTop={2}>
      {renderFolderAndFiles}
    </Box>
  );
};

export default ReceivedListFileFolder;
