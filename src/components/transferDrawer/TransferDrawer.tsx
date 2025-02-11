import {
  CloseIconContainer,
  StyledDivider,
  StyledDrawer,
  TransferCopyLinkWrapper,
  TransferGeneratingWrapper,
} from "@/app/(body)/project/projectBody.styles";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  requestTransferDetailsStatus,
  selectCurrentTransfer,
  selectShareLinkUrl,
  selectShowShareLink,
  selectTransferId,
  selectTransferPolling,
  selectTransferStatus,
  selectTransferType,
  setResetTransfer,
  setShowShareLink,
} from "@/store/slices/workspace.slice";
import TransferLinkHeader from "@/components/transferDrawer/TransferLinkHeader";
import TransferSendHeader from "@/components/transferDrawer/TransferSendHeader";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import theme from "@/styles/theme";
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import CopyLinkButton from "../shared/buttons/CopyLinkButton";
import { useTranslation } from "next-i18next";
import { filesAndSize } from "@/common/utils/fileUtils";
import { useEffect, useMemo, useState } from "react";
import { selectProject } from "@/store/slices/workspace.slice";
import dayjs from "dayjs";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import { showNotify } from "@/store/slices/notification.slice";

interface TransferDrawerProps {
  name: string;
  projectId: string;
}

const TransferDrawer = ({ name, projectId }: TransferDrawerProps) => {
  const { t } = useTranslation("workspaces");
  const transferType = useAppSelector(selectTransferType);
  const dispatch = useAppDispatch();
  const project = useAppSelector(selectProject(projectId));
  const currentTransfer = useAppSelector(selectCurrentTransfer);
  const [showPassword, setShowPassword] = useState(false);
  const transferId = useAppSelector(selectTransferId);
  const polling = useAppSelector(selectTransferPolling);
  const transferStatus = useAppSelector(selectTransferStatus);
  const shareLink = useAppSelector(selectShareLinkUrl);
  const showShareLink = useAppSelector(selectShowShareLink);
  const [showLink, setShowLink] = useState(showShareLink);

  const closeTransferDrawer = () => {
    const reset = {
      transferPolling: false,
      transferStatus: "",
      showShareLink: false,
      currentTransfer: {},
      transferDrawerOpen: false,
    };
    dispatch(setResetTransfer(reset));
  };

  const POLLING_INTERVAL = 2000;

  const totalSize = useMemo(
    () => project?.files.reduce((acc, curr) => acc + (curr.size || 0), 0),
    [project?.files],
  );

  const allFilesAndSizeLabel = filesAndSize(
    project?.files?.length || 0,
    totalSize || 0,
    t,
  );

  const formatExpiryDate = () => {
    return dayjs()
      .add(currentTransfer?.daysToExpire, "day")
      .format("HH:mmA, DD MMM YYYY");
  };

  const formatReceivers = () => {
    return currentTransfer?.receivers?.join(", ");
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const formatPassword = () => {
    return Buffer.from(currentTransfer?.password, "base64").toString("utf-8");
  };

  useEffect(() => {
    setShowLink(showShareLink);
  }, [showShareLink]);

  useEffect(() => {
    let intervalId: NodeJS.Timer;
    if (polling) {
      intervalId = setInterval(() => {
        dispatch(requestTransferDetailsStatus({ transferId }))
          .unwrap()
          .catch(() => {
            dispatch(
              showNotify({
                isOpen: true,
                message: "notify.somethingWentWrong",
                type: "warning",
                persisted: true,
              }),
            );
          });
      }, POLLING_INTERVAL);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [polling]);

  useEffect(() => {
    if (transferStatus === "Failed") {
      dispatch(
        showNotify({
          isOpen: true,
          message: "message_dialog.error.virusDetected",
          type: "warning",
          persisted: true,
        }),
      );
      return closeTransferDrawer();
    }

    if (transferStatus === "Complete") {
      dispatch(setShowShareLink(true));

      dispatch(
        showNotify({
          isOpen: true,
          message: "notify.newFileTransferCreated",
          type: "success",
        }),
      );
      setShowLink(true);
    }
  }, [transferStatus]);

  return (
    <StyledDrawer>
      <CloseIconContainer onClick={closeTransferDrawer}>
        <CloseRoundedIcon
          sx={{
            fontSize: "16px",
            color: theme.palette.grey[600],
          }}
        />
      </CloseIconContainer>
      {transferType === "link" ? (
        <TransferLinkHeader />
      ) : (
        <TransferSendHeader transferStatus={transferStatus} />
      )}

      <StyledDivider />
      <Typography
        component="p"
        variant="labelS"
        sx={{ paddingBottom: theme.spacing(1.5) }}
      >
        {t("workspaces.transfer.drawer.link.title")}
      </Typography>

      {!showLink ? (
        <TransferCopyLinkWrapper>
          <TransferGeneratingWrapper>
            <CircularProgress
              size="13px"
              sx={{
                marginRight: theme.spacing(1),
              }}
            />
            <Typography variant="bodyS">
              {t("workspaces.transfer.drawer.link.generating")}
            </Typography>

            <Typography
              variant="labelS"
              component="p"
              sx={{
                marginLeft: "auto",
                color: theme.palette.black[300],
                padding: theme.spacing(0, 0.7),
              }}
            >
              {t("workspaces.transfer.drawer.copy.text")}
            </Typography>
          </TransferGeneratingWrapper>
        </TransferCopyLinkWrapper>
      ) : (
        <TransferCopyLinkWrapper>
          <CopyLinkButton linkToCopy={shareLink} isReceivedTransfer />
        </TransferCopyLinkWrapper>
      )}

      <StyledDivider />

      <Typography variant="labelM" component="h3">
        {name}
      </Typography>

      <Typography
        variant="labelM"
        component="h3"
        sx={{ marginTop: theme.spacing(4) }}
      >
        {t("workspaces.transfer.drawer.files.title")}
      </Typography>

      <Typography
        variant="bodyM"
        color="textSecondary"
        sx={{ marginTop: theme.spacing(1) }}
      >
        {allFilesAndSizeLabel}
      </Typography>

      <Typography
        variant="labelM"
        component="h3"
        sx={{ marginTop: theme.spacing(4) }}
      >
        {t("workspaces.transfer.drawer.expiration.title")}
      </Typography>

      <Typography
        variant="bodyM"
        color="textSecondary"
        sx={{ marginTop: theme.spacing(1) }}
      >
        {t("workspaces.transfer.drawer.expiration.text")} {formatExpiryDate()}
      </Typography>

      {transferType !== "link" && (
        <>
          <Typography
            variant="labelM"
            component="h3"
            sx={{ marginTop: theme.spacing(4) }}
          >
            {currentTransfer?.receivers?.length > 1
              ? t("workspaces.transfer.drawer.sent.to.multiple", {
                  amount: currentTransfer.receivers.length,
                })
              : t("workspaces.transfer.drawer.sent.to")}
          </Typography>

          <Typography
            variant="bodyM"
            color="textSecondary"
            sx={{ marginTop: theme.spacing(1) }}
          >
            {formatReceivers()}
          </Typography>
        </>
      )}

      {currentTransfer?.password && (
        <>
          <Typography
            variant="labelM"
            component="h3"
            sx={{ marginTop: theme.spacing(4) }}
          >
            {t("workspaces.transfer.drawer.password.title")}
          </Typography>

          <TextField
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={formatPassword()} // Replace with the actual password value
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? (
                      <Visibility sx={{ fontSize: "16px" }} />
                    ) : (
                      <VisibilityOff sx={{ fontSize: "16px" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{
              marginTop: theme.spacing(1.5),
              input: {
                padding: theme.spacing(0, 2, 0),
                border: "none",
                height: "40px",
              },

              fieldset: {
                outline: 0,
                borderRadius: theme.spacing(1),
                border: `1px solid ${theme.palette.grey[300]}`,
                width: "100%",
              },
            }}
          />
        </>
      )}

      {currentTransfer?.message && (
        <>
          <Typography
            variant="labelM"
            component="h3"
            sx={{ marginTop: theme.spacing(4) }}
          >
            {t("workspaces.transfer.drawer.message.title")}
          </Typography>

          <Typography
            variant="bodyM"
            color="textSecondary"
            sx={{ marginTop: theme.spacing(1) }}
          >
            {currentTransfer.message}
          </Typography>
        </>
      )}
    </StyledDrawer>
  );
};

export default TransferDrawer;
