"use client";

import routes from "@/common/constants/routes";
import useFilesUpload from "@/common/hooks/useFilesUpload";
import {
  FILE_PREVIEW_TYPE,
  getFilePreviewType,
  sizeAndUnitCalc,
} from "@/common/utils/fileUtils";
import {
  FileListItemStyled,
  FileListItemStyledWrapper,
  FilePreviewBoxStyled,
  FilePreviewIconBoxStyled,
} from "@/components/receiver/fileListItem.styles";
import SkeletonPreviewHolder from "@/components/receiver/SkeletonPreviewHolder";
import StatusButton from "@/components/receiver/StatusButton";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectIsTrialsModalRequired,
  setShowTrialsModal,
} from "@/store/slices/auth.slice";
import { showNotify } from "@/store/slices/notification.slice";
import {
  selectSafeArea,
  setSafeArea,
  setSafeAreaAll,
} from "@/store/slices/receiver.slice";
import {
  IProjectFile,
  selectFilesWithVirus,
  selectProjectFiles,
  setFilesUploading,
  setFilesWithVirus,
  setRemoveFilesUploading,
} from "@/store/slices/workspace.slice";
import theme from "@/styles/theme";
import { CloseRounded, MoreVertRounded } from "@mui/icons-material";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import {
  Box,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useEffect, useMemo, useState } from "react";
import {
  colorIconSelector,
  FileExtensionSelector,
  IconSelector,
} from "../senderForm/senderForm.utils";

interface IFileListItemProps {
  item: IProjectFile;
  workspaceId: string;
  folderId: string;
}

const FileListItem: FC<IFileListItemProps> = ({
  item,
  workspaceId,
  folderId,
}) => {
  const { t } = useTranslation("workspaces");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(true);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const abortController = useMemo(() => {
    return new AbortController();
  }, []);

  const { progress, uploadIds, parts } = useFilesUpload(
    folderId,
    [{ ...item }],
    abortController,
  );

  const isTrialsModalRequired = useAppSelector(selectIsTrialsModalRequired);
  const safeAreas = useAppSelector(selectSafeArea);
  const filesWithVirus = useAppSelector(selectFilesWithVirus);
  const hasVirus = filesWithVirus.includes(item?.id);
  const [hasDisplayedError, setHasDisplayedError] = useState(false);

  useEffect(() => {
    if (item?.status === "Upload") {
      setIsUploading(true);
      dispatch(setFilesUploading(item.id));
    }
    if (item?.status === "Inprogress" || item?.status === "Waiting") {
      setIsUploading(false);
      setIsFinalizing(true);
      dispatch(setRemoveFilesUploading(item.id));
    }

    if (item?.status === "Failed") {
      dispatch(setFilesWithVirus(item?.id));
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

      setIsFinalizing(false);
      setIsUploading(false);
    }

    if (item?.status === "Complete") {
      setIsFinalizing(false);
      setIsUploading(false);
    }
  }, [item]);

  useEffect(() => {
    if (
      item.multipart &&
      parts[item.fileName] &&
      parts[item.fileName].length !== item.multipart.parts.length
    ) {
      return;
    }
    if (progress === 100 && isUploading) {
      setIsUploading(false);
      setIsFinalizing(true);
      setIsUploadDone(true);
    }
  }, [progress, parts, isUploading]);

  const [isUploadDone, setIsUploadDone] = useState(false);

  const itemName = item.name || item.fileName;

  const filePreviewType = getFilePreviewType(
    itemName,
    item.preview,
    item.qc?.result?.report || item.qcReport,
  );

  const fileName = itemName.substring(
    itemName.lastIndexOf("/") + 1,
    itemName.length,
  );

  const fileExtension = FileExtensionSelector(itemName);

  const fileSize = item.size || item.fileSize;

  const handleRemoveFile = () => {};

  const handleCancelUpload = async () => {};

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleCloseMore = (e: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorEl(null);
  };

  const handleFileDownloadClick = (e: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    e.preventDefault();
    e.stopPropagation();

    window.open(item.url, "_blank");
    setAnchorEl(null);
  };

  const handleRemoveFileClick = async (e: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    e.preventDefault();
    e.stopPropagation();

    handleRemoveFile();
    setAnchorEl(null);
  };

  const clearSafeAreas = () => {
    if (safeAreas.length) {
      dispatch(setSafeAreaAll(false));
      return dispatch(setSafeArea([]));
    }

    return;
  };

  const handlePreview = (e: { preventDefault: () => void }) => {
    if (isTrialsModalRequired) {
      e.preventDefault();
      dispatch(setShowTrialsModal(true));
    }
    if (hasVirus) {
      e.preventDefault();
    } else {
      clearSafeAreas();
    }
  };

  const handlePreviewOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const thumbnailUrl =
    item.preview.largeThumbnailUrl || item.preview.smallThumbnailUrl;

  return (
    <FileListItemStyledWrapper $failed={hasVirus}>
      <FileListItemStyled
        component={Link}
        href={
          !isUploading && !isFinalizing
            ? `${window.location.pathname}/preview/${item.id}`
            : ""
        }
        onClick={handlePreview}
        secondaryAction={
          <Box display="flex" alignItems="center" gap={1} marginRight={-0.5}>
            {(isUploading || isFinalizing) && !hasVirus ? (
              <Box display="flex" alignItems="center" gap={2}>
                <StatusButton
                  numberPercent={progress}
                  isFinalizing={isFinalizing}
                />
                <IconButton size="small" onClick={handleCancelUpload}>
                  <CloseRounded fontSize="small" />
                </IconButton>
              </Box>
            ) : hasVirus ? (
              <Box display="flex" alignItems="center" gap={2}>
                <IconButton size="small" onClick={handleCancelUpload}>
                  <CloseRounded
                    fontSize="small"
                    sx={{
                      color: theme.palette.pink[650],
                    }}
                  />
                </IconButton>
              </Box>
            ) : (
              <>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    handlePreviewOptions(e);
                  }}
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
                      onClick={handleFileDownloadClick}
                    >
                      <Typography variant="bodyM">
                        {t("btn.download.file")}
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      sx={{ color: "#fff" }}
                      onClick={handleRemoveFileClick}
                    >
                      <Typography variant="bodyM">
                        {t("btn.remove.file")}
                      </Typography>
                    </MenuItem>
                  </Box>
                </Menu>
              </>
            )}
          </Box>
        }
      >
        <>
          {isUploading || isFinalizing ? (
            <SkeletonPreviewHolder />
          ) : (
            <>
              {thumbnailUrl ? (
                <FilePreviewBoxStyled>
                  <Image
                    priority={false}
                    src={thumbnailUrl}
                    width={84}
                    height={60}
                    alt=""
                  />
                  {(filePreviewType === FILE_PREVIEW_TYPE.AUDIO ||
                    filePreviewType === FILE_PREVIEW_TYPE.VIDEO) && (
                    <Box
                      position="absolute"
                      display="flex"
                      width={theme.spacing(2)}
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.6)",
                        width: theme.spacing(2),
                        height: theme.spacing(2),
                        borderRadius: "50%",
                      }}
                    >
                      <PlayArrowRoundedIcon
                        data-testid="dti-play-icon"
                        sx={{
                          "&&&": {
                            width: theme.spacing(2),
                            height: theme.spacing(2),
                            color: theme.palette.black[800],
                          },
                        }}
                      />
                    </Box>
                  )}
                </FilePreviewBoxStyled>
              ) : (
                <>
                  {hasVirus ? (
                    <FilePreviewIconBoxStyled
                      sx={{ backgroundColor: "#FFD3BE" }}
                    >
                      <ImageRoundedIcon
                        sx={{ color: theme.palette.pink[650] }}
                      />
                    </FilePreviewIconBoxStyled>
                  ) : (
                    <FilePreviewIconBoxStyled
                      sx={{ backgroundColor: colorIconSelector(fileExtension) }}
                    >
                      {IconSelector(fileExtension, false)}
                    </FilePreviewIconBoxStyled>
                  )}
                </>
              )}
            </>
          )}
        </>
        <ListItemText
          primary={fileName}
          secondary={`${sizeAndUnitCalc(fileSize)} • ${fileExtension}`}
          primaryTypographyProps={{
            title: fileName,
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
      </FileListItemStyled>
    </FileListItemStyledWrapper>
  );
};

export default FileListItem;
