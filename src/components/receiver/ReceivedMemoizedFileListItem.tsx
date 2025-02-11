import { memo } from "react";
import ReceivedFileListItem from "@/components/receiver/ReceivedFileListItem";
import { File } from "@/api/types/receivedTransfers.types";

interface IMemoizedFileListItem {
  item: File;
}

// eslint-disable-next-line react/display-name
const ReceivedMemoizedFileListItem = memo<IMemoizedFileListItem>(({ item }) => {
  return <ReceivedFileListItem item={item} />;
});

export default ReceivedMemoizedFileListItem;
