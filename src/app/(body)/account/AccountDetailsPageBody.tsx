"use client";

import ProfileForm from "@/components/form/ProfileForm";
import AccountSecurity from "@/components/security/AccountSecurity";
import AccountPageLayout from "@/layouts/AccountPageLayout";
import theme from "@/styles/theme";
import { Box, Paper, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";

const AccountDetailsPageBody = () => {
  const { t } = useTranslation("account");

  const isUserDataReady = true;

  return (
    <AccountPageLayout>
      <Box
        height={theme.spacing(10)}
        display={{ xs: "none", md: "flex" }}
        alignItems="center"
      >
        <Typography sx={{ typography: { xs: "titleS", lg: "titleM" } }}>
          {t("account.title")}
        </Typography>
      </Box>
      <Box display="flex" gap={1.5} flexDirection="column">
        <Typography variant="titleS" paddingTop={2} paddingBottom={2}>
          {t("account.text.profile")}
        </Typography>
        <Box
          sx={{
            maxWidth: theme.spacing(85),
          }}
        >
          {isUserDataReady && <ProfileForm />}
        </Box>
      </Box>
      <Typography variant="titleS" paddingTop={4} paddingBottom={2}>
        {t("account.text.security.heading")}
      </Typography>
      <Paper
        variant="outlined"
        sx={{
          maxWidth: theme.spacing(85),
          padding: 2,
          borderRadius: theme.spacing(2),
        }}
      >
        {isUserDataReady && <AccountSecurity />}
      </Paper>
    </AccountPageLayout>
  );
};

export default AccountDetailsPageBody;
