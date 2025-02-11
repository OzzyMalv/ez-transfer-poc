"use client";

import { IReceiverSessionInfoResponse } from "@/api/types/receiverUser.types";
import { ENV_CONSTANTS } from "@/common/constants/env.const";
import useTooltipProps from "@/common/hooks/useTooltipProps";
import { sizeAndUnitCalc } from "@/common/utils/fileUtils";
import heapUserInternalTracking from "@/common/utils/heapTracking";
import {
  ErrorTooltip,
  StyledErrorIcon,
} from "@/components/senderForm/senderForm.styles";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectContinueDisabled,
  selectGlobalErrors,
  selectReceiverSessionInfo,
  setError,
} from "@/store/slices/receiver.slice";
import theme from "@/styles/theme";
import {
  Box,
  Button,
  Grid,
  Link,
  Typography,
  useMediaQuery,
} from "@mui/material";
import dayjs from "dayjs";
import { Trans, useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useState } from "react";
import SummeryInfoBox, {
  MessageBox,
  StyledHealthAndSafetyRoundedIcon,
  StyledTypography,
  StyledVisualImg,
} from "@/app/(pages)/user/receiver.styles";

const Password = dynamic(
  () => import("@/app/(body)/receiver/password.receiver"),
);
const MessageDialog = dynamic(
  () => import("@/components/shared/MessageDialog"),
);

import { selectIsLoggedIn } from "@/store/slices/auth.slice";

interface IReceiverSummeryViewProps {
  data: IReceiverSessionInfoResponse;
  setConfirm: (password: string) => void;
}

const ReceiverSummeryView: React.FC<IReceiverSummeryViewProps> = (props) => {
  const { data, setConfirm } = props;
  const { t } = useTranslation("receiver");
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useAppDispatch();
  const isContinueDisabled = useAppSelector(selectContinueDisabled);
  const sessionInfo = useAppSelector(selectReceiverSessionInfo);
  const [password, setPassword] = useState("");
  const { status: errorStatus } = useAppSelector(selectGlobalErrors);
  const { tooltipProps } = useTooltipProps({
    onHide: () => dispatch(setError({ status: "hide", message: "" })),
    showOn: errorStatus === "visible",
  });

  if (sessionInfo !== null) {
    heapUserInternalTracking(sessionInfo.receiverEmail);
  }

  const isUserLoggedIn = useAppSelector(selectIsLoggedIn);

  const shouldShowPasswordInput =
    data.isPasswordProtected &&
    !ENV_CONSTANTS.FEATURE_PRIVATE_WORKSPACE_ENABLED;
  return (
    <Grid container gap={matches ? 3 : 0}>
      <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "grid" } }}>
        <MessageBox>
          <Box px={{ md: 5, lg: 10 }} mb={matches ? 0 : 20}>
            <Typography
              variant="hL"
              sx={{
                typography: {
                  lg: "displayS",
                  sm: "displayS",
                },
              }}
            >
              {t("receiver.heading")}
            </Typography>
            <Typography variant="bodyL" mt={2}>
              {t("receiver.paragraph")}
            </Typography>
            <Typography variant="bodyL" mt={2}>
              {t("receiver.sub.paragraph")}
            </Typography>
            <Box sx={{ display: { xs: "none", lg: "block" } }}>
              <StyledVisualImg
                src="/img/receiver-visual.svg"
                width={600}
                height={355}
                priority
                quality={100}
                alt="receiver welcome page"
              />
            </Box>
          </Box>
        </MessageBox>
      </Grid>
      <Grid item xs={12} md={6} paddingTop={{ xs: 4, sm: 10, md: 0 }}>
        <MessageBox>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: { sm: "start", md: "center" },
              alignItems: "center",
            }}
          >
            <ErrorTooltip
              placement={"left"}
              arrow
              title={
                <Box
                  data-testid="dti-ReceiverPasswordErrorTooltip"
                  data-analytics="receiver-password-error-tooltip"
                >
                  <StyledErrorIcon
                    data-testid="dti-ReceiverPasswordErrorTooltip-icon"
                    data-analytics="receiver-password-error-tooltip-icon"
                  />
                  <Typography variant="bodyS">
                    {t("receiver.form.password.error.tooltip")}
                  </Typography>
                </Box>
              }
              {...tooltipProps}
            >
              <SummeryInfoBox>
                {matches && <MessageDialog />}
                <Box
                  sx={{
                    "&&": {
                      flexDirection: "column",
                      alignItems: "flex-start",
                      display: "flex",
                      gap: "16px",
                    },
                  }}
                >
                  <Typography variant="hL">
                    {t("receiver.form.heading")}
                  </Typography>
                  <Typography
                    variant="bodyL"
                    sx={{ overflowWrap: "anywhere", wordWrap: "anywhere" }}
                  >
                    <b>{data.senderEmail}</b>
                    {t("receiver.form.paragraph", {
                      count: data.numberOfFiles,
                      size: sizeAndUnitCalc(data.totalFilesize),
                      expiryDate: dayjs(data.expirationDate).format(
                        "DD MMM YYYY",
                      ),
                    })}
                  </Typography>
                  {shouldShowPasswordInput && (
                    <Password setPassword={setPassword} password={password} />
                  )}

                  <StyledTypography
                    variant="bodyM"
                    $passwordProtected={shouldShowPasswordInput}
                  >
                    <StyledHealthAndSafetyRoundedIcon />
                    {t("receiver.virusCheck.message")}
                  </StyledTypography>

                  <Typography
                    variant="bodyM"
                    sx={{
                      "&&": {
                        color: theme.palette.grey[600],
                      },
                    }}
                    data-analytics="receiver-summery-toast"
                  >
                    <Trans t={t}>
                      receiver.form.terms.toast
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        href={ENV_CONSTANTS.NEXT_PUBLIC_PEACH_TERMS_URL}
                        style={{
                          textDecoration: "underline",
                          color: theme.palette.grey[600],
                        }}
                      >
                        link
                      </Link>
                    </Trans>
                  </Typography>
                </Box>
                {isUserLoggedIn && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                      width: "100%",
                      marginTop: 3,
                    }}
                    data-testid="dti-receiver-confirmationBtn"
                    data-analytics="receiver-confirmation-btn"
                    onClick={() => {
                      setConfirm(password);
                    }}
                    disabled={
                      shouldShowPasswordInput ? isContinueDisabled : false
                    }
                  >
                    {t("receiver.form.submitBtn")}
                  </Button>
                )}
              </SummeryInfoBox>
            </ErrorTooltip>
          </Box>
        </MessageBox>
      </Grid>
    </Grid>
  );
};

export default ReceiverSummeryView;
