"use client";

import { DetailedAnalysisState } from "@/api/types/receiverUser.types";
import { ENV_CONSTANTS } from "@/common/constants/env.const";
import {
  FILE_PREVIEW_TYPE,
  getFilePreviewType,
  sizeAndUnitCalc,
} from "@/common/utils/fileUtils";
import SafeAreaMenu from "@/components/receiver/SafeAreaMenu";
import { FileExtensionSelector } from "@/components/senderForm/senderForm.utils";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectSafeArea,
  setSafeArea,
  setSafeAreaAll,
} from "@/store/slices/receiver.slice";
import theme from "@/styles/theme";
import {
  CloseOutlined,
  FileDownloadOutlined,
  FolderRounded,
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";
import { Box, Grid, IconButton, Skeleton, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type Player from "video.js/dist/types/player";
import AudioFilePreviewHolder from "@/views/AudioFilePreviewHolder.view";
import FilePreviewSummary from "@/views/FilePreviewSummary.view";
import HTMLFilePreview from "@/views/HTMLFilePreview.view";
import ImageFilePreview from "@/views/ImageFilePreview.view";
import NoPreviewHolder from "@/views/NoPreviewHolder.view";
import {
  AnalyseIcon,
  AnalyseTrialChip,
  StyledDesktopSafeAreaMenu,
  StyledMobileSafeAreaMenu,
  VideoJsBoxStyled,
  FilePreviewCardContent,
  FilePreviewCardHeader,
  FilePreviewCard,
} from "@/views/filePreview.styles";
import { useParams, usePathname } from "next/navigation";
import routes from "@/common/constants/routes";
import { MainPreviewWrapper } from "@/app/(body)/receiver/receivers.styles";
import {
  requestGetSingleReceivedTransfer,
  selectReceivedFileList,
  selectReceivedTransfer,
} from "@/store/slices/receivedTransfers.slice";
import PreviewFileAnalyseReceivedTransfer from "@/components/fileAnalyse/PreviewFileAnalyseReceivedTransfer";
import TransferPasswordDialog from "@/components/transferPasswordDialog/TransferPasswordDialog";
import SkeletonPreviewFileAnalyseReceivedTransfer from "@/components/fileAnalyse/SkeletonPreviewFileAnalyseReceivedTransfer";

const VideoJsPlayer = dynamic(
  () => import("@/components/videoJsPlayer/VideoJsPlayer"),
);

const removePreviewFromUrl = (route: string, previewPart: string) => {
  const index = route.indexOf(previewPart);
  return index !== -1 ? route.substring(0, index) : route;
};

const ReceivedFilePreview = () => {
  const { t } = useTranslation("receiverSessionFiles");
  const { receivedTransferId, fileId } = useParams<{
    receivedTransferId: string;
    fileId: string;
  }>();

  const files = useAppSelector((s) =>
    selectReceivedFileList(s, receivedTransferId),
  );

  const transfer = useAppSelector((s) =>
    selectReceivedTransfer(s, receivedTransferId),
  );

  const isPasswordProtected = transfer?.isPasswordProtected;
  const senderEmail = transfer?.senderEmail;

  const filesIdsList = files?.map((s) => `${s.fileKey}`) ?? [];

  const fileData = files?.find((file) => `${file.fileKey}` === fileId);

  const pathname = usePathname() || "";
  const [isOpen, setDialogOpen] = useState(false);
  const routeToGoBack = removePreviewFromUrl(pathname, `preview/${fileId}`);
  const videoPlayerRef = useRef<Player | null>(null);
  const dispatch = useAppDispatch();
  const activeSafeArea = useAppSelector(selectSafeArea);

  const [detailedAnalysisState, showDetailedAnalysis] =
    useState<DetailedAnalysisState>({
      isOpenResults: false,
      analysisResult: null,
    });

  useEffect(() => {
    if (!transfer) {
      dispatch(
        requestGetSingleReceivedTransfer({
          filesetSessionId: receivedTransferId,
          withFiles: false,
        }),
      );
    }
    if (isPasswordProtected) {
      setDialogOpen(true);
      return;
    }
    if (transfer && !isPasswordProtected) {
      dispatch(
        requestGetSingleReceivedTransfer({
          filesetSessionId: receivedTransferId,
          withFiles: true,
        }),
      );
    }
  }, [dispatch, receivedTransferId, isPasswordProtected]);

  const {
    fileKey,
    size,
    name = "",
    downloadUrl,
    preview = {
      smallProxyUrl: "",
      largeThumbnailUrl: "",
      smallThumbnailUrl: "",
      hasProxy: false,
    },
    qc = { result: { report: [], subReports: [] }, availableProfiles: [] },
  } = fileData || {};

  const IS_WITH_TRIAL_LABEL =
    ENV_CONSTANTS.FEATURE_ANALYSIS_TRIAL_LABEL_ENABLED;

  const routeToOtherFile = removePreviewFromUrl(pathname, `${fileKey}`);
  const currentPosition = filesIdsList.indexOf(`${fileKey}`);
  const navigationLinkUp =
    currentPosition === 0 ? null : filesIdsList[currentPosition - 1];
  const navigationLinkDown =
    currentPosition === filesIdsList.length - 1
      ? null
      : filesIdsList[currentPosition + 1];

  const handlePlayerReady = (player: Player) => {
    videoPlayerRef.current = player;
    player.on("waiting", () => {});
    player.on("loadedmetadata", () => {});
    player.on("dispose", () => {});
    player.on("error", () => {});
    player.on("play", () => {});
    player.on("pause", () => {});
  };

  const filePaths = name.split(routes.HOME);
  const fileName = filePaths.pop()!;

  const filePreviewType = getFilePreviewType(
    fileName,
    preview,
    qc.result?.report,
  );

  const clearSafeArea = () => {
    if (activeSafeArea.length) {
      dispatch(setSafeAreaAll(false));
      return dispatch(setSafeArea([]));
    }
    return;
  };

  const hideDetailedAnalysis = () => {
    showDetailedAnalysis({
      isOpenResults: false,
      analysisResult: null,
    });
  };

  const handleFileNavigation = () => {
    clearSafeArea();
    hideDetailedAnalysis();
  };

  return (
    <>
      <TransferPasswordDialog
        isOpen={isOpen}
        onClose={() => setDialogOpen(false)}
        onSave={() => setDialogOpen(false)}
        receivedTransferId={receivedTransferId}
        senderEmail={senderEmail || ""}
        blurBackground
      />
      <MainPreviewWrapper data-testid="dti-receivers-main-preview-file">
        <Box display="flex" justifyContent="space-between" paddingBottom={2.5}>
          <Box>
            <IconButton
              component={Link}
              disabled={!navigationLinkUp}
              href={`${routeToOtherFile}${navigationLinkUp}/`}
              data-testid={`dti-receiver-preview-up-arrow`}
              data-analytics="receiver-preview-up-arrow"
              onClick={handleFileNavigation}
              color="primary"
              sx={{
                backgroundColor: theme.palette.black[100],
                "&.Mui-disabled": {
                  backgroundColor: theme.palette.black[100],
                  "& svg": {
                    opacity: 0.25,
                  },
                },
              }}
            >
              <KeyboardArrowUpRounded
                sx={{
                  color: "#000",
                  fontSize: 20,
                }}
              />
            </IconButton>
            <IconButton
              component={Link}
              disabled={!navigationLinkDown}
              href={`${routeToOtherFile}${navigationLinkDown}/`}
              data-testid={`dti-receiver-preview-down-arrow`}
              data-analytics="receiver-preview-down-arrow"
              color="primary"
              onClick={handleFileNavigation}
              sx={{
                marginLeft: theme.spacing(1),
                backgroundColor: theme.palette.black[100],
                "&.Mui-disabled": {
                  backgroundColor: theme.palette.black[100],
                  "& svg": {
                    opacity: 0.25,
                  },
                },
              }}
            >
              <KeyboardArrowDownRounded
                sx={{
                  color: "#000",
                  fontSize: 20,
                }}
              />
            </IconButton>
          </Box>
          <Box>
            <IconButton
              href={downloadUrl || ""}
              data-testid={`dti-receiver-preview-download-${fileKey}`}
              data-analytics="receiver-preview-dl-btn"
            >
              <FileDownloadOutlined
                sx={{
                  "&&": {
                    color: "#000",
                    fontSize: 20,
                  },
                }}
              />
            </IconButton>
            <IconButton
              sx={{
                marginLeft: theme.spacing(3),
                backgroundColor: "#E9E9E9",
              }}
              component={Link}
              href={routeToGoBack}
              data-testid={`dti-receiver-preview-back`}
              data-analytics="receiver-preview-back-btn"
              onClick={clearSafeArea}
            >
              <CloseOutlined
                sx={{
                  "&&": {
                    color: "#000",
                    fontSize: 20,
                  },
                }}
              />
            </IconButton>
          </Box>
        </Box>
        <Grid container>
          <Grid item xs={12} md={8} paddingTop={1.25} paddingRight={{ md: 2 }}>
            <Box>
              <Box display="flex" flexDirection="column">
                <Grid container>
                  <Grid
                    item
                    xs={filePreviewType === FILE_PREVIEW_TYPE.VIDEO ? 9 : 12}
                  >
                    <Typography
                      sx={{ wordBreak: "break-word" }}
                      variant="titleL"
                      data-testid="dti-filename"
                    >
                      {fileName}
                    </Typography>
                    {filePaths.length ? (
                      <Box
                        display="flex"
                        alignItems="center"
                        paddingTop={0.5}
                        paddingBottom={3.5}
                        data-testid="dti-folder"
                        flexWrap="wrap"
                      >
                        <FolderRounded
                          fontSize="small"
                          sx={{
                            color: theme.palette.grey[600],
                          }}
                          data-testid="dti-folder-icon"
                        />
                        {filePaths.map((filepath, index) => {
                          return (
                            <Fragment key={`${filepath}_${index}`}>
                              <Typography
                                variant="bodyM"
                                paddingLeft={0.5}
                                paddingRight={0.5}
                                color={theme.palette.grey[600]}
                                data-testid={`dti-${filepath}_${index}`}
                                sx={{
                                  wordBreak: "break-word",
                                }}
                              >
                                {filepath}
                              </Typography>
                              {index !== filePaths.length - 1 && (
                                <Typography
                                  variant="bodyM"
                                  paddingLeft={0.5}
                                  paddingRight={0.5}
                                  color={theme.palette.grey[600]}
                                >
                                  &gt;
                                </Typography>
                              )}
                            </Fragment>
                          );
                        })}
                      </Box>
                    ) : size ? (
                      <Typography
                        variant="bodyM"
                        paddingTop={0.5}
                        paddingBottom={2}
                        color={theme.palette.grey[600]}
                      >
                        {t("receiver_session_files.filePreview", {
                          size: sizeAndUnitCalc(size || 0),
                          type: FileExtensionSelector(fileName),
                        })}
                      </Typography>
                    ) : (
                      <Skeleton
                        sx={{
                          width: {
                            xs: theme.spacing(4.5),
                            md: theme.spacing(10.5),
                          },
                          height: {
                            xs: theme.spacing(4.5),
                          },
                          marginBottom: theme.spacing(2),
                          borderRadius: {
                            xs: theme.spacing(1),
                            md: theme.spacing(2),
                          },
                        }}
                        variant="rounded"
                        animation="pulse"
                      />
                    )}
                  </Grid>
                  {filePreviewType === FILE_PREVIEW_TYPE.VIDEO && (
                    <Grid item xs={3}>
                      <StyledDesktopSafeAreaMenu>
                        <SafeAreaMenu />
                      </StyledDesktopSafeAreaMenu>
                    </Grid>
                  )}
                </Grid>
              </Box>
              {filePreviewType === FILE_PREVIEW_TYPE.VIDEO && (
                <StyledMobileSafeAreaMenu>
                  <SafeAreaMenu />
                </StyledMobileSafeAreaMenu>
              )}

              {filePreviewType === FILE_PREVIEW_TYPE.UNKNOWN && (
                <NoPreviewHolder fileName={fileName} />
              )}
              {filePreviewType === FILE_PREVIEW_TYPE.HTML && (
                <HTMLFilePreview
                  smallProxyUrl={preview.smallProxyUrl}
                  thumbnailUrl={preview.largeThumbnailUrl}
                  fileName={fileName}
                />
              )}
              {filePreviewType === FILE_PREVIEW_TYPE.IMAGE && (
                <ImageFilePreview
                  thumbnailUrl={preview.largeThumbnailUrl}
                  fileName={fileName}
                />
              )}

              {(filePreviewType === FILE_PREVIEW_TYPE.AUDIO ||
                filePreviewType === FILE_PREVIEW_TYPE.VIDEO) && (
                <VideoJsBoxStyled>
                  {filePreviewType === FILE_PREVIEW_TYPE.AUDIO && (
                    <AudioFilePreviewHolder />
                  )}
                  <VideoJsPlayer
                    onReady={handlePlayerReady}
                    options={{
                      autoplay: false,
                      controls: true,
                      responsive: true,
                      fluid: true,
                      audioOnlyMode:
                        filePreviewType === FILE_PREVIEW_TYPE.AUDIO,
                      poster: preview.largeThumbnailUrl,
                      sources: [
                        {
                          src: preview.smallProxyUrl,
                        },
                      ],
                    }}
                  />
                </VideoJsBoxStyled>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            paddingLeft={{ md: 3.5 }}
            paddingTop={{ xs: 1.25 }}
          >
            <Box display="flex" flexDirection="column" gap={2}>
              {qc.availableProfiles.length !== 0 ? (
                <FilePreviewCard
                  data-testid="dti-preview-file-analyse"
                  sx={{
                    "&.MuiCard-root": {
                      "&&": { padding: theme.spacing(1, 2, 2, 2) },
                    },
                  }}
                >
                  <FilePreviewCardHeader
                    title={
                      <Box display="flex" alignItems="center" gap={1}>
                        <AnalyseIcon
                          $isShowingResults={qc.result.report.length !== 0}
                        />
                        <Typography variant="titleS">
                          {t("receiver_session_files.preview.analyse.heading")}
                        </Typography>
                        {IS_WITH_TRIAL_LABEL && (
                          <AnalyseTrialChip
                            label="TRIAL"
                            variant="outlined"
                            clickable={false}
                          />
                        )}
                      </Box>
                    }
                  />
                  <FilePreviewCardContent>
                    {fileData && (
                      <PreviewFileAnalyseReceivedTransfer
                        file={fileData}
                        detailedAnalysisState={detailedAnalysisState}
                        showDetailedAnalysis={showDetailedAnalysis}
                      />
                    )}
                  </FilePreviewCardContent>
                </FilePreviewCard>
              ) : (
                <FilePreviewCard>
                  <SkeletonPreviewFileAnalyseReceivedTransfer testId="analysis-skeleton" />
                </FilePreviewCard>
              )}
              <FilePreviewCard>
                {fileData ? (
                  <>
                    <FilePreviewCardHeader
                      title={
                        <Typography variant="titleS">
                          {t(
                            "receiver_session_files.filePreview.summary.title",
                          )}
                        </Typography>
                      }
                    />
                    <FilePreviewCardContent>
                      <FilePreviewSummary
                        qcReport={qc.result?.report || []}
                        fileType={filePreviewType}
                        qcSubReports={qc.result?.subReports || []}
                      />
                    </FilePreviewCardContent>
                  </>
                ) : (
                  <SkeletonPreviewFileAnalyseReceivedTransfer testId="summary-skeleton" />
                )}
              </FilePreviewCard>
            </Box>
          </Grid>
        </Grid>
      </MainPreviewWrapper>
    </>
  );
};

export default ReceivedFilePreview;
