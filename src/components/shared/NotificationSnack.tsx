"use client";

import { toFixedGB } from "@/common/utils/fileUtils";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectMaxStorageLimit } from "@/store/slices/auth.slice";
import {
  selectShowingNotify,
  showNotify,
} from "@/store/slices/notification.slice";
import theme from "@/styles/theme";
import styled from "@emotion/styled";
import { CheckCircleRounded, InfoOutlined } from "@mui/icons-material";
import {
  Alert,
  Button,
  Slide,
  SlideProps,
  Snackbar,
  SnackbarOrigin,
  Typography,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import { FC, useEffect, useRef, useState } from "react";
import { Portal } from "@mui/base";

export const StyledAlert = styled(Alert)`
  && {
    background-color: ${theme.palette.primary.main};
    border-radius: ${theme.spacing(1.5)};
    min-height: ${theme.spacing(5)};
    padding: ${theme.spacing(0.125, 1.5)};
    width: max-content;
    & .MuiAlert-icon {
      font-size: 16px;
      padding: ${theme.spacing(1.2, 0)};
      margin-right: ${theme.spacing(1)};
    }

    & .MuiAlert-action {
      align-items: center;
      padding: 0;
    }
  }
`;

export const StyledAlertButton = styled(Button)`
  && {
    color: rgba(236, 236, 236, 1);
    margin-left: ${theme.spacing(1)};
  }
`;

const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction="up" />;
};

const DELAY_MS = 3000;

const NotificationSnack: FC = () => {
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();
  const { isOpen, message, type, persisted } =
    useAppSelector(selectShowingNotify);

  const currentMaxFilesTransferSize = useAppSelector(selectMaxStorageLimit);

  const currentMaxFilesTransferSizeInGB = toFixedGB(
    currentMaxFilesTransferSize,
  );

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [state] = useState<SnackbarOrigin>({
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal } = state;

  useEffect(() => {
    if (timeoutRef.current !== null) {
      timeoutRef.current = null;
      clearTimeout(timeoutRef.current!);
    }
    if (isOpen && !persisted) {
      timeoutRef.current = setTimeout(() => {
        dispatch(showNotify({ isOpen: false, message: "", type: "success" }));
      }, DELAY_MS);
    }
    return () => clearTimeout(timeoutRef.current!);
  }, [isOpen, timeoutRef.current, persisted]);

  const getIcon = () => {
    if (type === "success") {
      return <CheckCircleRounded fontSize="inherit" />;
    }
    if (type === "warning") {
      return <InfoOutlined fontSize="inherit" />;
    }
  };

  const handleOnCloseAction = () => {
    dispatch(showNotify({ isOpen: false, message: "", type: "success" }));
  };

  return (
    <Portal>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        TransitionComponent={SlideTransition}
        open={isOpen}
        key={message}
      >
        <StyledAlert
          icon={getIcon()}
          severity={type}
          action={
            type !== "success" ? (
              <StyledAlertButton size="small" onClick={handleOnCloseAction}>
                {t("notify.gotIt")}
              </StyledAlertButton>
            ) : null
          }
        >
          <Typography variant="titleS" color="#fff" sx={{ fontWeight: 400 }}>
            {message === "message_dialog.error.fileSizeExceeds"
              ? t(message as string, {
                  size: currentMaxFilesTransferSizeInGB,
                })
              : t(message as "notify.saved")}
          </Typography>
        </StyledAlert>
      </Snackbar>
    </Portal>
  );
};

export default NotificationSnack;
