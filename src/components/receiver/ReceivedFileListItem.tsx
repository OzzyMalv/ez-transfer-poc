"use client";

import {
  FILE_PREVIEW_TYPE,
  getFilePreviewType,
  sizeAndUnitCalc,
} from "@/common/utils/fileUtils";
import {
  FileListItemStyled,
  FilePreviewBoxStyled,
  FilePreviewIconBoxStyled,
} from "@/components/receiver/fileListItem.styles";
import theme from "@/styles/theme";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Box, IconButton, ListItemText } from "@mui/material";
import Image from "next/image";
import { FC } from "react";
import {
  colorIconSelector,
  FileExtensionSelector,
  IconSelector,
} from "@/components/senderForm/senderForm.utils";
import Link from "next/link";
import { File } from "@/api/types/receivedTransfers.types";
import { ReceivedFilesDownloadButton } from "@/app/(body)/received-transfers/received-transfer/receivedTransfer.styles";
import FileAnalysisStatusReceivedTransfer from "@/components/fileAnalyse/FileAnalysisStatusReceivedTransfer";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectIsTrialsModalRequired,
  setShowTrialsModal,
} from "@/store/slices/auth.slice";
import {
  selectSafeArea,
  setSafeArea,
  setSafeAreaAll,
} from "@/store/slices/receiver.slice";

interface IReceivedFileListItemProps {
  item: File;
}

const ReceivedFileListItem: FC<IReceivedFileListItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const isTrialsModalRequired = useAppSelector(selectIsTrialsModalRequired);
  const safeAreas = useAppSelector(selectSafeArea);
  const itemName = item.name;

  const filePreviewType = getFilePreviewType(
    itemName,
    item.preview,
    item.qc.result?.report,
  );

  const fileName = itemName.substring(
    itemName.lastIndexOf("/") + 1,
    itemName.length,
  );
  const fileExtension = FileExtensionSelector(itemName);

  const fileSize = item.size;

  const handleFileDownloadClick = (e: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(item.downloadUrl, "_blank");
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
    } else {
      clearSafeAreas();
    }
  };

  const thumbnailUrl =
    item.preview.largeThumbnailUrl || item.preview.smallThumbnailUrl;

  return (
    <FileListItemStyled
      component={Link}
      onClick={handlePreview}
      href={`${window.location.pathname}/preview/${item.fileKey}`}
      secondaryAction={
        <Box display="flex" alignItems="center" gap={1} marginRight={-0.5}>
          <>
            {item.qc.availableProfiles?.length > 0 && (
              <FileAnalysisStatusReceivedTransfer file={item} />
            )}
            <IconButton
              sx={{ p: 0.75 }}
              onClick={(e) => handleFileDownloadClick(e)}
            >
              <ReceivedFilesDownloadButton />
            </IconButton>
          </>
        </Box>
      }
    >
      <>
        {thumbnailUrl ? (
          <FilePreviewBoxStyled>
            <Image
              priority={false}
              src={thumbnailUrl}
              width={84}
              height={60}
              data-testid="dti-preview-image"
              alt="preview"
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
          <FilePreviewIconBoxStyled
            sx={{ backgroundColor: colorIconSelector(fileExtension) }}
          >
            {IconSelector(fileExtension, false)}
          </FilePreviewIconBoxStyled>
        )}
      </>
      <ListItemText
        primary={fileName}
        secondary={`${sizeAndUnitCalc(fileSize)} • ${fileExtension}`}
        primaryTypographyProps={{
          title: fileName,
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
    </FileListItemStyled>
  );
};

export default ReceivedFileListItem;
