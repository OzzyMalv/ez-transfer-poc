import { IProjectFile } from "@/store/slices/workspace.slice";
import { memo } from "react";
import FileListItem from "./FileListItem";

interface IMemoizedFileListItem {
  item: IProjectFile;
  workspaceId: string;
  folderId: string;
}

// eslint-disable-next-line react/display-name
const MemoizedFileListItem = memo<IMemoizedFileListItem>(
  ({ item, workspaceId, folderId }) => {
    return (
      <FileListItem item={item} workspaceId={workspaceId} folderId={folderId} />
    );
  },
);

export default MemoizedFileListItem;
