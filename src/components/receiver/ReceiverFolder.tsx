import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Typography, ListItemText, List, Box } from "@mui/material";
import { FC, useState } from "react";
import { sizeAndUnitCalc } from "@/common/utils/fileUtils";
import { useTranslation } from "react-i18next";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  CollapsedFolderWrapper,
  ReceiverFolderListItem,
  SubFolder,
  SubFolderWrapper,
} from "./receiverfolder.styles";
import { File } from "@/api/types/receiverUser.types";
import {
  IFolder,
  IRootFolder,
} from "@/common/hooks/useReceiverFolderStructure";
import ReceiverFile from "@/components/receiver/ReceiverFile";
import { ReceiverFilesListItemExtension } from "@/app/(pages)/user/receiver.styles";
import routes from "@/common/constants/routes";

interface Props {
  name: string;
  folderMap: IRootFolder;
  count: number;
  size: number;
}
const ReceiverFolder: FC<Props> = ({ name, folderMap, count, size }) => {
  const { t } = useTranslation("receiverSessionFiles");

  const renderFiles = (files: File[]) => {
    return files.map((file, index) => (
      <ReceiverFile item={file} id={index} key={index} />
    ));
  };

  const renderSubFolderAndFiles = (subFolders: IFolder) => {
    return Object.keys(subFolders).map((key) => {
      return (
        <SubFolderWrapper key={key}>
          <SubFolder>
            {key.split(routes.HOME).map((folderName) => (
              <Box
                key={folderName}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <KeyboardArrowRightIcon fontSize="small" />
                <Typography variant="titleS">{folderName}</Typography>
              </Box>
            ))}
          </SubFolder>
          {subFolders[key].map((file, index) => {
            return <ReceiverFile item={file} id={index} key={index} />;
          })}
        </SubFolderWrapper>
      );
    });
  };

  const [open, setOpen] = useState(false);

  const folderInfoLabel = `${sizeAndUnitCalc(size)} • ${t(
    "receiver_session_files.form.folder",
  )} • ${count} ${t("receiver_session_files.form.files")}`;

  return (
    <>
      <ReceiverFolderListItem onClick={() => setOpen(!open)} $open={open}>
        <ReceiverFilesListItemExtension>
          <img src="/img/illustrations/folder.svg" alt="" />
        </ReceiverFilesListItemExtension>
        <ListItemText
          primary={name}
          secondary={folderInfoLabel}
          primaryTypographyProps={{
            variant: "titleS",
            sx: {
              "&&": {
                whiteSpace: "nowrap",
                overflowX: "hidden",
                textOverflow: "ellipsis",
                marginRight: 6,
              },
            },
          }}
          secondaryTypographyProps={{
            variant: "bodyS",
          }}
        />
        <Box paddingRight={0.75}>{open ? <ExpandLess /> : <ExpandMore />}</Box>
      </ReceiverFolderListItem>
      <CollapsedFolderWrapper
        in={open}
        timeout={{ enter: 400, exit: 100 }}
        unmountOnExit
      >
        <List component="div" disablePadding>
          {renderFiles(folderMap.files)}
          {folderMap.subFolders &&
            renderSubFolderAndFiles(folderMap.subFolders)}
        </List>
      </CollapsedFolderWrapper>
    </>
  );
};

export default ReceiverFolder;
