"use client";

import routes from "@/common/constants/routes";
import useFilesUpload from "@/common/hooks/useFilesUpload";
import {
  IFolder,
  IRootFolder,
} from "@/common/hooks/useReceiverFolderStructure";
import { sizeAndUnitCalc } from "@/common/utils/fileUtils";
import {
  FolderCollapseStyled,
  FolderListItemStyled,
  FolderPreviewIconBoxStyled,
} from "@/components/receiver/folderListItem.styles";
import SkeletonPreviewHolder from "@/components/receiver/SkeletonPreviewHolder";
import StatusButton from "@/components/receiver/StatusButton";
import { FolderIconSelectorNew } from "@/components/senderForm/senderForm.utils";
import { useAppDispatch, useAppSelector } from "@/store";
import { showNotify } from "@/store/slices/notification.slice";
import {
  IProjectFile,
  requestRemoveFile,
  selectProjectFiles,
  setFoldersUploading,
  setRemoveFoldersUploading,
} from "@/store/slices/workspace.slice";
import { deleteProject, removeProject } from "@/store/slices/workspaces.slice";
import theme from "@/styles/theme";
import {
  CloseRounded,
  ExpandLess,
  ExpandMore,
  MoreVertRounded,
} from "@mui/icons-material";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Box,
  IconButton,
  List,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import MemoizedFileListItem from "./MemoizedFileListItem";

interface IFolderListItemProps {
  name: string;
  folderMap: IRootFolder;
  count: number;
  size: number;
  isUploading?: boolean;
  workspaceId: string;
  folderId: string;
}

const FolderListItem: FC<IFolderListItemProps> = ({
  name,
  folderMap,
  count,
  size,
  workspaceId,
  folderId,
}) => {
  const { t } = useTranslation(["receiverSessionFiles", "workspaces"]);
  const router = useRouter();

  const abortController = useMemo(() => {
    return new AbortController();
  }, []);

  const projectFiles = useAppSelector(selectProjectFiles(folderId));

  const files = folderMap.files || [];
  if (folderMap.subFolders) {
    Object.keys(folderMap.subFolders).reduce((acc, key) => {
      const subFolder = folderMap.subFolders?.[key] ?? [];
      for (const file of subFolder) {
        if (!acc.some((f) => f.name === file.name)) {
          acc.push(file);
        }
      }
      return acc;
    }, files);
  }

  const { progress, parts, uploadIds } = useFilesUpload(
    folderId,
    files,
    abortController,
  );

  const [isUploading, setIsUploading] = useState(true);

  const [isFinalizing, setIsFinalizing] = useState(false);

  const [hasVirus, setHasVirus] = useState(false);

  const dispatch = useAppDispatch();
  const [hasDisplayedError, setHasDisplayedError] = useState(false);

  useEffect(() => {
    const filesToUpload = files.filter(
      (file) =>
        file.status === "Upload" ||
        file.status === "New" ||
        file.status === "Uploading",
    );

    const filesInProgress = files.filter(
      (file) => file.status === "Inprogress" || file.status === "Waiting",
    );

    const filesFailed = folderMap.files.filter(
      (file) => file.status === "Failed",
    );

    if (filesToUpload.length > 0) {
      setIsUploading(true);
      setIsFinalizing(false);

      filesToUpload.forEach((file) => {
        if (file.id) {
          dispatch(setFoldersUploading(file.id));
        }
      });
    }

    if (filesFailed.length) {
      setHasVirus(true);
      if (!hasDisplayedError) {
        dispatch(
          showNotify({
            isOpen: true,
            message: "message_dialog.error.virusDetected",
            type: "warning",
          }),
        );
        setHasDisplayedError(true);
      }
    } else {
      setHasVirus(false);
    }

    if (filesToUpload.length === 0 && filesInProgress.length > 0) {
      setIsUploading(false);
      setIsFinalizing(true);

      filesInProgress.forEach((file) => {
        dispatch(setRemoveFoldersUploading(file.id));
      });
    }

    if (filesToUpload.length === 0 && filesInProgress.length === 0) {
      setIsUploading(false);
      setIsFinalizing(false);
    }
  }, [files]);

  const [open, setOpen] = useState(false);

  const renderFiles = (files: IProjectFile[]) => {
    return files.map((file) => (
      <Box key={file.id} paddingX={1}>
        <MemoizedFileListItem
          item={{ ...file, id: `${file.fileId || file.id}` }}
          workspaceId={workspaceId}
          folderId={folderId}
        />
      </Box>
    ));
  };

  const renderSubFolderAndFiles = (subFolders: IFolder) => {
    return Object.keys(subFolders).map((key) => {
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
            {subFolders[key].map((file) => {
              return (
                <Box key={file.fileName} paddingX={1}>
                  <MemoizedFileListItem
                    item={file}
                    workspaceId={workspaceId}
                    folderId={folderId}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      );
    });
  };

  const folderInfoLabel = `${sizeAndUnitCalc(size)} • ${t(
    "receiver_session_files.form.folder",
  )} • ${count} ${t("receiver_session_files.form.files")}`;

  const handleCancelUpload = async () => {
    const promises = [];
    abortController.abort();
    for (const file of files) {
      promises.push(
        dispatch(requestRemoveFile({ workspaceId, folderId, fileId: file.id })),
      );
    }

    Promise.all(promises).then(() => {
      if (files.length === projectFiles.length) {
        dispatch(deleteProject({ workspaceId, projectId: folderId })).then(
          () => {
            router.push(routes.WORKSPACES);
          },
        );
      }
    });
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleCloseMore = (e: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorEl(null);
  };

  const handleRemoveFolder = async (e: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    e.preventDefault();
    e.stopPropagation();

    handleDeleteFiles();
    setAnchorEl(null);
  };

  const handleDeleteFiles = () => {};

  return (
    <Box>
      <FolderListItemStyled
        onClick={() => !isUploading && !isFinalizing && setOpen(!open)}
        $open={open}
        $failed={hasVirus}
        secondaryAction={
          <Box display="flex" alignItems="center" gap={1} marginRight={-0.5}>
            {isUploading || isFinalizing ? (
              <Box display="flex" alignItems="center" gap={2}>
                <StatusButton
                  numberPercent={progress}
                  isFinalizing={isFinalizing}
                />
                <IconButton size="small" onClick={handleCancelUpload}>
                  <CloseRounded fontSize="small" />
                </IconButton>
              </Box>
            ) : (
              <>
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

                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setAnchorEl(e.currentTarget);
                  }}
                  data-testid="more-button"
                >
                  <MoreVertRounded fontSize="small" />
                </IconButton>

                <Menu
                  id="more-button"
                  MenuListProps={{
                    "aria-labelledby": "more-button",
                    disablePadding: true,
                  }}
                  anchorEl={anchorEl}
                  open={!!anchorEl}
                  onClose={handleCloseMore}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      borderRadius: theme.spacing(1.5),
                      background: "#555",
                      marginTop: "10px",
                    },
                  }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <Box padding={1}>
                    <MenuItem
                      sx={{ color: "#fff" }}
                      onClick={handleRemoveFolder}
                    >
                      <Typography variant="bodyM">
                        {t("btn.remove.folder", {
                          ns: "workspaces",
                        })}
                      </Typography>
                    </MenuItem>
                  </Box>
                </Menu>
              </>
            )}
          </Box>
        }
      >
        {isUploading || isFinalizing ? (
          <SkeletonPreviewHolder />
        ) : hasVirus ? (
          <FolderPreviewIconBoxStyled $failed={hasVirus}>
            <FolderRoundedIcon
              sx={{
                color: theme.palette.pink[650],
                width: theme.spacing(2),
                height: theme.spacing(2),
              }}
            />
          </FolderPreviewIconBoxStyled>
        ) : (
          <FolderPreviewIconBoxStyled>
            {FolderIconSelectorNew()}
          </FolderPreviewIconBoxStyled>
        )}
        <ListItemText
          primary={name}
          secondary={folderInfoLabel}
          primaryTypographyProps={{
            title: name,
            variant: isUploading ? "bodyM" : "titleS",
            color: isUploading ? "textSecondary" : "textPrimary",
            sx: {
              whiteSpace: "nowrap",
              overflowX: "hidden",
              textOverflow: "ellipsis",
              marginRight: {
                xs: 10,
                md: isUploading || isFinalizing ? 22 : 10,
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
            {renderFiles(folderMap.files)}
          </Box>
          {folderMap.subFolders &&
            renderSubFolderAndFiles(folderMap.subFolders)}
        </List>
      </FolderCollapseStyled>
    </Box>
  );
};

export default FolderListItem;
