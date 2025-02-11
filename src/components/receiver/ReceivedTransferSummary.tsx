"use client";

import { sizeAndUnitCalc } from "@/common/utils/fileUtils";
import theme from "@/styles/theme";
import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import dynamic from "next/dynamic";

import CopyLinkButton from "@/components/shared/buttons/CopyLinkButton";
import { CopyLinkWrapper } from "@/app/(body)/received-transfers/received-transfer/receivedTransfer.styles";
import {
  Comment,
  CommentWrapper,
} from "@/app/(body)/received-transfers/receivedTransfers.styles";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectReceivedTransfer } from "@/store/slices/receivedTransfers.slice";
import { useParams } from "next/navigation";
import {
  selectIsTrialsModalRequired,
  setShowTrialsModal,
} from "@/store/slices/auth.slice";
import SaveToWorkspaceDialog from "@/app/(body)/received-transfers/SaveToWorkspaceDialog";

const AnimatedActionButton = dynamic(
  () => import("@/components/shared/buttons/AnimatedActionButton"),
);

const ReceivedTransferSummary: React.FC = () => {
  const { t } = useTranslation("received-transfers");
  const { receivedTransferId } = useParams();
  const transfer = useAppSelector((s) =>
    selectReceivedTransfer(s, receivedTransferId as string),
  );
  const isTrialsModalRequired = useAppSelector(selectIsTrialsModalRequired);
  const dispatch = useAppDispatch();

  const [isOpen, setDialogOpen] = useState(false);

  const handleSaveToWorkspace = () => {
    if (isTrialsModalRequired) {
      return dispatch(setShowTrialsModal(true));
    }

    return setDialogOpen(true);
  };

  return (
    <Box
      sx={{
        display: { xs: "block", md: "flex" },
        borderRadius: theme.spacing(1),
        border: `1px solid ${theme.palette.grey[300]}`,
      }}
    >
      <Grid
        container
        data-testid="dti-receivers-formView"
        data-analytics="receivers-form-view"
      >
        <Grid
          item
          xs={12}
          md={4.5}
          lg={3}
          sx={{ display: { xs: "block", md: "flex" } }}
        >
          <Box flex={1} padding={theme.spacing(2, 2, 3, 2)}>
            <Box>
              <Typography variant="titleL">
                {t("transfer.summary.header")}
              </Typography>
              {transfer ? (
                <Typography
                  variant="bodyM"
                  sx={{
                    overflowWrap: "anywhere",
                    wordWrap: "anywhere",
                  }}
                  paddingTop={2}
                >
                  <b data-analytics="receivers-email-sender">
                    {transfer.senderEmail}
                  </b>
                  {t("transfer.summary.transferInfo", {
                    count: transfer.numberOfFiles,
                    size: sizeAndUnitCalc(transfer.totalFilesize),
                    expiryDate: dayjs(transfer.expirationDate).format(
                      "DD MMM YYYY",
                    ),
                  })}
                </Typography>
              ) : (
                <Skeleton
                  data-testid="dti-received-transfer-summary-skeleton"
                  sx={{
                    marginTop: theme.spacing(2),
                    height: {
                      xs: theme.spacing(2),
                    },
                    borderRadius: {
                      xs: theme.spacing(1),
                      md: theme.spacing(2),
                    },
                  }}
                  variant="rounded"
                  animation="pulse"
                />
              )}

              <Box
                display="flex"
                flexDirection="column"
                padding={theme.spacing(3, 0, 4, 0)}
                gap={1}
              >
                <AnimatedActionButton
                  data-testid="dti-downloadAllBtn"
                  data-analytics="download-all-btn"
                  btnText={{
                    firstView: t("transfer.summary.button.downloadAll"),
                    secondView: "",
                  }}
                  size="small"
                  customStartIcon={{
                    firstView: <div />,
                    secondView: <div />,
                  }}
                  buttonWidth={{
                    firstView: "100%",
                    secondView: "100%",
                  }}
                  disabled={!transfer?.downloadUrl?.length}
                  href={transfer?.downloadUrl}
                />
                <Button
                  data-testid="save-to-workspace-btn"
                  data-analytics="save-to-workspace-btn"
                  size="small"
                  variant="outlined"
                  sx={{ borderRadius: "12px", width: "100%" }}
                  disabled={!transfer}
                  onClick={handleSaveToWorkspace}
                >
                  {t("transfer.summary.button.saveToWorkspace")}
                </Button>
              </Box>
              <Typography variant="bodyM">
                {t("transfer.summary.link")}
              </Typography>
              <CopyLinkWrapper>
                <CopyLinkButton
                  linkToCopy={transfer?.shareLinkUrl || ""}
                  isReceivedTransfer
                />
              </CopyLinkWrapper>
            </Box>
            {transfer?.message && transfer.message.length > 1 && (
              <CommentWrapper
                data-testid="dti-received-transfer-formView-messageBoxWrapper"
                data-analytics="received-transfer-form-view-message-box"
              >
                <Box data-testid="dti-received-transfer-messageBox">
                  <Typography variant="titleS" sx={{ marginBottom: 1 }}>
                    {t("transfer.summary.message.title")}
                  </Typography>

                  <Comment variant="bodyS">{transfer?.message}</Comment>
                </Box>
              </CommentWrapper>
            )}
          </Box>
        </Grid>
      </Grid>
      <SaveToWorkspaceDialog
        isOpen={isOpen}
        onClose={() => setDialogOpen(false)}
        onSave={() => setDialogOpen(false)}
        transfer={transfer}
      />
    </Box>
  );
};

export default ReceivedTransferSummary;
