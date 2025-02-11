import { sizeAndUnitCalc } from "@/common/utils/fileUtils";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectReceiverFileSetSession,
  selectReceiverSessionInfo,
} from "@/store/slices/receiver.slice";
import theme from "@/styles/theme";
import {
  CheckRounded,
  FileDownloadOutlined,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";
import { Box, Grid, Slide, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  BackTopTopButton,
  ReceiverFilesViewLeftWrapper,
  ReceiverFilesViewRightWrapper,
  SenderCommentBox,
  SenderCommentBoxInnerWrapper,
} from "@/app/(pages)/user/receiver.styles";

import dynamic from "next/dynamic";

import ReceiverFilesList from "@/components/receiver/ReceiverFilesList";
import CopyLinkButton from "@/components/shared/buttons/CopyLinkButton";
import FilesAnalyseButton from "@/components/fileAnalyse/FilesAnalyseButton";
import { selectQcFirst } from "@/store/slices/senderForm.slice";
import { setIsSender } from "@/store/slices/auth.slice";

const AnimatedActionButton = dynamic(
  () => import("@/components/shared/buttons/AnimatedActionButton"),
);

const ReceiverFilesView: React.FC = () => {
  const { t } = useTranslation("receiverSessionFiles");
  const dispatch = useAppDispatch();
  const [isBackToTopBtnVisible, setIsBackToTopBtnVisible] = useState(false);
  const sessionInfo = useAppSelector(selectReceiverSessionInfo);
  const sessionFiles = useAppSelector(selectReceiverFileSetSession);
  const isQcFirst = useAppSelector(selectQcFirst);

  useEffect(() => {
    // To display another model when user clicked on features which are behind paywall
    dispatch(setIsSender(false));
  }, []);

  const analyseFiles = useMemo(() => {
    return sessionFiles?.files.filter(
      (file) => file.qc.availableProfiles.length > 0,
    );
  }, [sessionFiles]);

  const [isMsgBoxReachToEnd, setIsMsgBoxReachToEnd] = useState(false);

  const handleScrollMsgBox = (e: React.SyntheticEvent) => {
    const eventTarget = e.target as HTMLDivElement;
    const isOnBottom =
      eventTarget.scrollHeight - eventTarget.scrollTop ===
      eventTarget.clientHeight;
    if (isOnBottom) {
      setIsMsgBoxReachToEnd(true);
    } else {
      if (isMsgBoxReachToEnd) setIsMsgBoxReachToEnd(false);
    }
  };

  const onPageScroll = (e: Event) => {
    // currentTarget
    if ((e.target as HTMLElement).scrollTop > 200) {
      setIsBackToTopBtnVisible(true);
    } else {
      setIsBackToTopBtnVisible(false);
    }
  };

  useEffect(() => {
    const container = document.getElementById("bgWrapper");

    if (container) {
      container.addEventListener("scroll", onPageScroll, false);
      return () => container.removeEventListener("scroll", onPageScroll);
    }
  }, []);

  const backToTopOfTheList = () => {
    const container = document.getElementById("bgWrapper");
    if (container) container.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!sessionInfo) {
    return <></>;
  }

  return (
    <Box sx={{ display: { xs: "contents", sm: "block", md: "flex" }, flex: 1 }}>
      <Grid
        container
        padding={{
          md: theme.spacing(4, 3, 8, 6),
          xs: theme.spacing(2, 3, 8, 3),
        }}
        data-testid="dti-receivers-formView"
        data-analytics="receivers-form-view"
      >
        <Grid
          item
          xs={12}
          md={4.5}
          lg={3}
          sx={{ display: { xs: "block", sm: "flex" } }}
          zeroMinWidth
        >
          <ReceiverFilesViewLeftWrapper>
            <Box>
              <Typography variant="hL">
                {t(
                  isQcFirst
                    ? "receiver_session_files.qcFirst.form.heading"
                    : "receiver_session_files.heading",
                )}
              </Typography>

              {isQcFirst ? (
                <Typography variant="bodyL" paddingTop={2}>
                  {t("receiver_session_files.qcFirst.form.subtitle")}
                </Typography>
              ) : (
                <Typography
                  variant="bodyL"
                  sx={{
                    overflowWrap: "anywhere",
                    wordWrap: "anywhere",
                  }}
                  paddingTop={2}
                >
                  <b data-analytics="receivers-email-sender">
                    {sessionInfo.senderEmail}
                  </b>
                  {t("receiver_session_files.paragraph", {
                    count: sessionInfo.numberOfFiles,
                    size: sizeAndUnitCalc(sessionInfo.totalFilesize),
                    expiryDate: dayjs(sessionInfo.expirationDate).format(
                      "DD MMM YYYY",
                    ),
                  })}
                </Typography>
              )}

              <Box padding={theme.spacing(3, 0, 4, 0)}>
                <AnimatedActionButton
                  data-testid="dti-downloadAllBtn"
                  data-analytics="download-all-btn"
                  btnText={{
                    firstView: t("receiver_session_files.buttonDownloadAll"),
                    secondView: t(
                      "receiver_session_files.buttonDownloadAll.started",
                    ),
                  }}
                  customStartIcon={{
                    firstView: <FileDownloadOutlined />,
                    secondView: <CheckRounded />,
                  }}
                  buttonWidth={{
                    firstView: "142px",
                    secondView: "172px",
                  }}
                  disabled={
                    !sessionFiles || sessionFiles?.downloadallUrl?.length === 0
                  }
                  href={sessionFiles?.downloadallUrl}
                />
              </Box>
              <Typography variant="labelL">
                {t("receiver_session_files.copy.title")}
              </Typography>
              <Box
                padding={theme.spacing(2, 0, 0, 0)}
                maxWidth={theme.spacing(37.25)}
              >
                <CopyLinkButton
                  linkToCopy={
                    sessionFiles?.shareLinkUrl || window.location.href
                  }
                />
              </Box>
            </Box>
            {sessionInfo.message && sessionInfo.message.length > 1 && (
              <SenderCommentBox
                data-testid="dti-receiver-formView-messageBoxWrapper"
                data-analytics="receiver-form-view-message-box"
              >
                <SenderCommentBoxInnerWrapper
                  onScroll={handleScrollMsgBox}
                  $showBottomLine={
                    isMsgBoxReachToEnd || sessionInfo.message.length < 350
                  }
                  data-testid="dti-receiver-formView-messageBox"
                >
                  <Typography variant="titleS">
                    {t("receiver_session_files.commentBoxTitle", {
                      name: sessionInfo.senderEmail.split("@")[0],
                    })}
                  </Typography>
                  <Typography
                    variant="bodyM"
                    paddingTop={1}
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {sessionInfo.message}
                  </Typography>
                </SenderCommentBoxInnerWrapper>
              </SenderCommentBox>
            )}
          </ReceiverFilesViewLeftWrapper>
        </Grid>
        <Grid
          item
          display={{ xs: "none", md: "block" }}
          md={0.7}
          lg={0.5}
        ></Grid>
        <Grid item xs={12} md={6}>
          <ReceiverFilesViewRightWrapper>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              paddingBottom={2}
            >
              <Typography variant="titleM">
                {t(
                  sessionInfo.numberOfFiles > 1
                    ? "receiver_session_files.sizeAndCounting"
                    : "receiver_session_files.size",
                  {
                    count: sessionInfo.numberOfFiles,
                    size: sizeAndUnitCalc(sessionInfo.totalFilesize),
                  },
                )}
              </Typography>
              <FilesAnalyseButton files={analyseFiles} />
            </Box>
            <ReceiverFilesList sessionFiles={sessionFiles} />
          </ReceiverFilesViewRightWrapper>
        </Grid>
        <Grid
          item
          xs={12}
          md={1}
          lg={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Slide
            direction="up"
            in={isBackToTopBtnVisible}
            mountOnEnter
            unmountOnExit
          >
            <BackTopTopButton
              aria-label="Back to Top"
              color="primary"
              size="medium"
              data-testid="dti-receivers-filesView-backTopTopBtn"
              data-analytics="receivers-files-view-back-to-top-btn"
              onClick={backToTopOfTheList}
            >
              <KeyboardArrowUpRounded />
            </BackTopTopButton>
          </Slide>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReceiverFilesView;
