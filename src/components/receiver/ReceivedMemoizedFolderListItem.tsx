import { memo } from "react";
import { IRootFolder } from "@/common/hooks/useReceiverFolderStructureV2";
import ReceivedFolderListItem from "@/components/receiver/ReceivedFolderListItem";

interface IReceivedMemoizedFolderListItem {
  name: string;
  folderMap: IRootFolder;
}

// eslint-disable-next-line react/display-name
const ReceivedMemoizedFolderListItem = memo<IReceivedMemoizedFolderListItem>(
  ({ name, folderMap }) => {
    return (
      <ReceivedFolderListItem
        name={name}
        folderMap={folderMap}
        size={folderMap.size}
        count={folderMap.count}
      />
    );
  },
);

export default ReceivedMemoizedFolderListItem;
