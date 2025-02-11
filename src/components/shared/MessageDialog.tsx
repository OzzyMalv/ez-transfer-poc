"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import {
  StyledErrorIcon,
  StyledInfoTextIcon,
  StyledLockIcon,
  StyledLockIconWrapper,
  StyledSuccessIcon,
} from "@/components/senderForm/senderForm.styles";
import { useTranslation } from "next-i18next";
import {
  selectGlobalErrors,
  selectSenderField,
  setError,
} from "@/store/slices/senderForm.slice";
import {
  selectGlobalErrors as selectReceiverGlobalErrors,
  setError as setReceiverError,
} from "@/store/slices/receiver.slice";
import styled from "@emotion/styled";
import { currentMaxStorageLimitInBytes } from "@/components/senderForm/senderForm.utils";
import { selectMaxStorageLimit } from "@/store/slices/auth.slice";
import { toFixedGB } from "@/common/utils/fileUtils";

export const StyledDialog = styled(Dialog)`
  && .MuiDialog-paper {
    border-radius: ${(p) => p.theme.spacing(2)};
    min-width: ${(p) => p.theme.spacing(42)};
    max-width: ${(p) => p.theme.spacing(43)};
  }
`;

const IconMatchMessageType = {
  error: (
    <StyledErrorIcon
      data-testid="dti-ErrorTooltip-icon"
      data-analytics="error-tooltip-icon"
    />
  ),
  success: (
    <StyledSuccessIcon
      data-testid="dti-SuccessTooltip-icon"
      data-analytics="success-tooltip-icon"
    />
  ),
  info: (
    <StyledLockIconWrapper>
      <StyledLockIcon
        data-testid="dti-PasswordTooltip-icon"
        data-analytics="password-tooltip-icon"
      />
    </StyledLockIconWrapper>
  ),
  infoText: (
    <Box display="flex" justifyContent="flex-start">
      <StyledInfoTextIcon
        data-testid="dti-info-icon"
        data-analytics="info-icon"
      />
    </Box>
  ),
};

const MessageDialog: FC = () => {
  const { t } = useTranslation(["sender", "common"]);
  const dispatch = useAppDispatch();
  const globalErrors = useAppSelector(selectGlobalErrors);
  const {
    status: receiverErrorStatus,
    message: receiverErrorMessage,
    messageType: receiverMessageType,
  } = useAppSelector(selectReceiverGlobalErrors);
  // todo maxStorageFeatureLimit should handle logic about limitations
  // todo senderEmailField.isLoggedInUser should be removed
  const maxStorageFeatureLimit = useAppSelector(selectMaxStorageLimit);
  const senderField = useAppSelector(selectSenderField);
  const { status, message, messageType } = globalErrors;
  const [isOpen, setOpen] = useState(false);

  const isVisible = status === "visible" || receiverErrorStatus === "visible";

  useEffect(() => {
    if (isVisible) {
      handleOpen();
    }
  }, [isVisible]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (status === "visible") {
      dispatch(setError({ status: "hide", message: "", messageType }));
    }
    if (receiverErrorStatus === "visible") {
      dispatch(
        setReceiverError({
          status: "hide",
          message: "",
          messageType: receiverMessageType,
        }),
      );
    }
  };

  const errorMessage = () => {
    if (status === "visible") {
      // todo should be removed and used select for limit
      const currentMaxFilesTransferSize = currentMaxStorageLimitInBytes(
        senderField.isLoggedInUser,
        maxStorageFeatureLimit,
      );

      const currentMaxFilesTransferSizeInGB = toFixedGB(
        currentMaxFilesTransferSize,
      );

      return t(message as "message_dialog.error.fileSizeExceeds", {
        size: currentMaxFilesTransferSizeInGB,
      });
    }
    if (receiverErrorStatus === "visible") {
      return t(receiverErrorMessage as "message_dialog.error.tooltip");
    }
    return null;
  };

  return (
    <StyledDialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      data-testid="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {IconMatchMessageType[messageType] || IconMatchMessageType.error}
      </DialogTitle>
      <DialogContent>
        <Typography variant="bodyS">{errorMessage()}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          color="primary"
          size="medium"
          onClick={handleClose}
          data-testid="responsive-dialog-close"
          data-analytics="responsive-dialog-close"
        >
          {t("app.ok", {
            ns: "common",
          })}
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default MessageDialog;
