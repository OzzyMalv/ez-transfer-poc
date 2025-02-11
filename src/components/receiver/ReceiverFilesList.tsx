import { IReceiverFileSetSessionInfoResponse } from "@/api/types/receiverUser.types";
import MessageDialog from "@/components/shared/MessageDialog";
import { List } from "@mui/material";
import { FC } from "react";

import useReceiverFolderStructure, {
  IFile,
  IRootFolder,
} from "@/common/hooks/useReceiverFolderStructure";
import dynamic from "next/dynamic";

const ReceiverFile = dynamic(() => import("./ReceiverFile"));
const ReceiverFolder = dynamic(() => import("./ReceiverFolder"));
interface Props {
  sessionFiles: IReceiverFileSetSessionInfoResponse | null;
}
const ReceiverFilesList: FC<Props> = ({ sessionFiles }) => {
  const { folderStructure } = useReceiverFolderStructure(sessionFiles?.files);

  const renderFolderAndFiles = Object.keys(folderStructure).map(
    (name, index) => {
      if (folderStructure[name].type === "file") {
        const file = (folderStructure[name] as IFile).file;
        return <ReceiverFile item={file} id={index} key={name} />;
      } else {
        const folderMap = folderStructure[name] as IRootFolder;
        return (
          <ReceiverFolder
            name={name}
            folderMap={folderMap}
            key={name}
            size={folderMap.size}
            count={folderMap.count}
          />
        );
      }
    },
  );

  return (
    <>
      <List disablePadding>{renderFolderAndFiles}</List>
      <MessageDialog />
    </>
  );
};

export default ReceiverFilesList;
