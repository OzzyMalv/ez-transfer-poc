import { File } from "@/api/types/receiverUser.types";
import {
  ReceiverFilesListItem,
  ReceiverFilesListItemExtension,
} from "@/app/(pages)/user/receiver.styles";
import {
  FILE_PREVIEW_TYPE,
  getFilePreviewType,
  sizeAndUnitCalc,
} from "@/common/utils/fileUtils";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectIsLoggedIn,
  selectIsTrialsModalRequired,
  setShowTrialsModal,
} from "@/store/slices/auth.slice";
import {
  selectSafeArea,
  setSafeArea,
  setSafeAreaAll,
} from "@/store/slices/receiver.slice";
import theme from "@/styles/theme";
import { FileDownloadOutlined } from "@mui/icons-material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Box, IconButton, ListItemText } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { FC, MouseEvent } from "react";
import FileAnalysisStatus from "../fileAnalyse/FileAnalysisStatus";
import {
  FileExtensionSelector,
  IconSelector,
} from "../senderForm/senderForm.utils";
import routes from "@/common/constants/routes";

interface Props {
  item: File | undefined;
  id: number;
}

const ReceiverFile: FC<Props> = ({ item, id }) => {
  const dispatch = useAppDispatch();
  const safeAreas = useAppSelector(selectSafeArea);
  const isUserLoggedIn = useAppSelector(selectIsLoggedIn);
  const isTrialsModalRequired = useAppSelector(selectIsTrialsModalRequired);

  if (!item) {
    return null;
  }

  const filePreviewType = getFilePreviewType(
    item.fileName,
    item.preview,
    item.qcReport,
  );

  const clearSafeAreas = () => {
    if (safeAreas.length) {
      dispatch(setSafeAreaAll(false));
      return dispatch(setSafeArea([]));
    }

    return;
  };

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isTrialsModalRequired) {
      event.preventDefault();
      dispatch(setShowTrialsModal(true));
    } else {
      clearSafeAreas();
    }
  };

  const handleFileDownloadClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    window.open(item.fileUrl, "_blank");
  };
  const isProfilesAvailable = item.qc.availableProfiles.length !== 0;

  const fileName = item.fileName.substring(
    item.fileName.lastIndexOf(routes.HOME) + 1,
    item.fileName.length,
  );

  return (
    <ReceiverFilesListItem
      component={Link}
      href={`${window.location.pathname}/files/${item.fileId}`}
      onClick={handleClick}
      secondaryAction={
        <Box display="flex" alignItems="center" gap={1}>
          {isUserLoggedIn && isProfilesAvailable && (
            <FileAnalysisStatus file={item} />
          )}
          <IconButton
            onClick={handleFileDownloadClick}
            data-testid={`dti-receiver-fileItem-${id}`}
            data-analytics="receiver-file-item-dl-btn"
            sx={{ p: 0.75 }}
          >
            <FileDownloadOutlined
              sx={{
                color: "#000",
                fontSize: 20,
              }}
            />
          </IconButton>
        </Box>
      }
    >
      <ReceiverFilesListItemExtension data-testid="dti-receiver-fileIcon">
        {item.preview.smallThumbnailUrl ? (
          <Image
            priority={false}
            src={item.preview.smallThumbnailUrl}
            width={36}
            height={36}
            alt=""
          />
        ) : (
          IconSelector(FileExtensionSelector(item.fileName), true)
        )}
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
      </ReceiverFilesListItemExtension>
      <ListItemText
        primary={fileName}
        secondary={sizeAndUnitCalc(item.fileSize)}
        primaryTypographyProps={{
          title: fileName,
          variant: "bodyM",
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
    </ReceiverFilesListItem>
  );
};

export default ReceiverFile;
