import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectUserAuthProfile,
  requestUpdateUserProfile,
  setUserProfileData,
} from "@/store/slices/auth.slice";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import theme from "@/styles/theme";
import { heapAddUserProperty } from "@/common/utils/heapTracking";

import { SwitchStyled } from "@/components/senderForm/senderForm.styles";
import { useState } from "react";
import Link from "next/link";
import { showNotify } from "@/store/slices/notification.slice";

type HeapProperty = {
  opted_in?: boolean;
};

const Preference = () => {
  const waitDuration = 500;
  const { t } = useTranslation("preferences");
  const dispatch = useAppDispatch();
  const profileData = useAppSelector(selectUserAuthProfile);
  const [isMarketingOptIn, setIsMarketingOptIn] = useState(
    profileData.isMarketingOptIn ?? false,
  );

  const [isSwitchDisabled, setSwitchDisabled] = useState(false);

  const handleSwitchClick = async () => {
    setIsMarketingOptIn(!isMarketingOptIn);
    setSwitchDisabled(true);
    await dispatch(
      requestUpdateUserProfile({
        ...profileData,
      }),
    )
      .unwrap()
      .then(() => {
        dispatch(
          setUserProfileData({
            ...profileData,
            isMarketingOptIn: !isMarketingOptIn,
          }),
        );
        dispatch(showNotify({ isOpen: true, message: "notify.saved" }));
      })
      .catch(() => {})
      .finally(() => {
        setTimeout(() => {
          setSwitchDisabled(false);
        }, waitDuration);
      });

    const heapProperty: HeapProperty = {
      opted_in: !isMarketingOptIn,
    };

    heapAddUserProperty(heapProperty);
  };

  const switchElement = (
    <SwitchStyled
      name="isMarketingOptIn"
      disabled={isSwitchDisabled}
      checked={isMarketingOptIn}
      onChange={handleSwitchClick}
      data-analytics="data-marketing-optin"
      data-testid="dti-marketing-optin"
      role="switch"
    />
  );

  const privaceyPolicyElement = (
    <Typography variant="bodyS" color={theme.palette.black[400]}>
      {t("preference.text.unsubscribe")}
      <Link
        style={{
          fontWeight: 500,
          marginLeft: 3,
          textDecoration: "underline",
        }}
        href=""
        target="_blank"
      >
        {t("preference.text.privacy_policy")}.
      </Link>
    </Typography>
  );

  return (
    <Box flex={1} display="flex" flexDirection="column">
      <Box
        display={{ xs: "none", md: "flex" }}
        height={theme.spacing(10)}
        alignItems="center"
      >
        <Typography sx={{ typography: { xs: "titleS", lg: "titleM" } }}>
          {t("preference.header.title")}
        </Typography>
      </Box>
      <Typography variant="titleM" paddingTop={2} paddingBottom={2}>
        {t("preference.text.communications")}
      </Typography>
      <Paper
        variant="outlined"
        sx={{
          maxWidth: theme.spacing(100),
          padding: theme.spacing(2, 3),
          borderRadius: theme.spacing(2),
        }}
      >
        <Grid container gap={{ xs: 1, md: 0 }}>
          <Grid
            item
            xs={12}
            md={10.5}
            display="flex"
            alignItems={{ xs: "center", md: "flex-start" }}
            flexDirection={{ xs: "row", md: "column" }}
            justifyContent="flex-start"
            gap={1}
          >
            <Typography variant="bodyS" color={theme.palette.black[800]}>
              {t("preference.text.send_occasional_email")}
            </Typography>
            <Box display={{ md: "none" }}>{switchElement}</Box>
            <Box display={{ xs: "none", md: "block" }}>
              {privaceyPolicyElement}
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={1.5}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Box display={{ xs: "none", md: "flex" }}>{switchElement}</Box>
            <Box display={{ md: "none" }}>{privaceyPolicyElement}</Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Preference;
