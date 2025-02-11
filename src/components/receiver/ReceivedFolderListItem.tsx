"use client";

import { IRootFolder } from "@/common/hooks/useReceiverFolderStructureV2";
import { sizeAndUnitCalc } from "@/common/utils/fileUtils";
import {
  FolderCollapseStyled,
  FolderListItemStyled,
  FolderPreviewIconBoxStyled,
} from "@/components/receiver/folderListItem.styles";
import { FolderIconSelectorNew } from "@/components/senderForm/senderForm.utils";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, IconButton, List, ListItemText, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import ReceivedFileListItem from "@/components/receiver/ReceivedFileListItem";

interface IFolderListItemProps {
  name: string;
  folderMap: IRootFolder;
  count: number;
  size: number;
}

const ReceivedFolderListItem: FC<IFolderListItemProps> = ({
  name,
  folderMap,
  count,
  size,
}) => {
  const { t } = useTranslation("receiverSessionFiles");

  const [open, setOpen] = useState(false);

  const folderInfoLabel = `${sizeAndUnitCalc(size)} • ${t(
    "receiver_session_files.form.folder",
  )} • ${count} ${t("receiver_session_files.form.files")}`;

  return (
    <Box>
      <FolderListItemStyled
        onClick={() => setOpen(!open)}
        $open={open}
        secondaryAction={
          <Box display="flex" alignItems="center" gap={1} marginRight={-0.5}>
            {
              <IconButton
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                {open ? (
                  <ExpandLess fontSize="small" />
                ) : (
                  <ExpandMore fontSize="small" />
                )}
              </IconButton>
            }
          </Box>
        }
      >
        {
          <FolderPreviewIconBoxStyled>
            {FolderIconSelectorNew()}
          </FolderPreviewIconBoxStyled>
        }
        <ListItemText
          primary={name}
          secondary={folderInfoLabel}
          primaryTypographyProps={{
            variant: "titleS",
            color: "textPrimary",
            sx: {
              "&&": {
                whiteSpace: "nowrap",
                overflowX: "hidden",
                textOverflow: "ellipsis",
                marginRight: 10,
              },
            },
          }}
          secondaryTypographyProps={{
            variant: "bodyS",
          }}
        />
      </FolderListItemStyled>

      <FolderCollapseStyled
        in={open}
        timeout={{ enter: 400, exit: 100 }}
        mountOnEnter
        unmountOnExit
      >
        <List
          component="div"
          disablePadding
          sx={{ marginTop: 2, marginBottom: 2 }}
        >
          <Box display="flex" flexDirection="column" gap={1}>
            {folderMap.files.map((file) => (
              <Box key={file.name} paddingX={1}>
                <ReceivedFileListItem
                  item={{ ...file, fileKey: `${file.fileKey}` }}
                />
              </Box>
            ))}
          </Box>
          {folderMap.subFolders &&
            Object.keys(folderMap.subFolders).map((key) => {
              return (
                <Box key={key}>
                  <Box display="flex" color="rgba(0, 0, 0, 0.6)" padding={1}>
                    {key.split("/").map((folderName) => (
                      <Box
                        key={folderName}
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        <KeyboardArrowRightIcon fontSize="small" />
                        <Typography variant="titleS">{folderName}</Typography>
                      </Box>
                    ))}
                  </Box>
                  <Box display="flex" flexDirection="column" gap={1}>
                    {folderMap?.subFolders?.[key].map((file) => {
                      return (
                        <Box key={file.name} paddingX={1}>
                          <ReceivedFileListItem item={file} />
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              );
            })}
        </List>
      </FolderCollapseStyled>
    </Box>
  );
};

export default ReceivedFolderListItem;
