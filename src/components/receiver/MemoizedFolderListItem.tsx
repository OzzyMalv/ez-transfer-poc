import { IRootFolder } from "@/common/hooks/useReceiverFolderStructure";
import { memo } from "react";
import FolderListItem from "./FolderListItem";

interface IMemoizedFolderListItem {
  name: string;
  folderMap: IRootFolder;
  workspaceId: string;
  folderId: string;
}

// eslint-disable-next-line react/display-name
const MemoizedFolderListItem = memo<IMemoizedFolderListItem>(
  ({ name, folderMap, workspaceId, folderId }) => {
    return (
      <FolderListItem
        name={name}
        folderMap={folderMap}
        size={folderMap.size}
        count={folderMap.count}
        workspaceId={workspaceId}
        folderId={folderId}
      />
    );
  },
);

export default MemoizedFolderListItem;
