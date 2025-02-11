"use client";

import { Box } from "@mui/material";
import { useAppSelector } from "@/store";
import {
  selectUserAuthProfileLoading,
  selectUserEmail,
} from "@/store/slices/auth.slice";
import Preference from "@/components/preferences/Preference";
import AccountPageLayout from "@/layouts/AccountPageLayout";

const PreferencesPageBody = () => {
  const isUserAuthProfileLoading = useAppSelector(selectUserAuthProfileLoading);
  const userEmail = useAppSelector(selectUserEmail);

  const isUserDataReady = !isUserAuthProfileLoading && !!userEmail;

  return (
    <AccountPageLayout>
      <Box paddingBottom={2}>{isUserDataReady && <Preference />}</Box>
    </AccountPageLayout>
  );
};

export default PreferencesPageBody;
