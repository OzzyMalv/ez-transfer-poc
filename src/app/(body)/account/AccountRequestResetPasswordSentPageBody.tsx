"use client";

import { Typography, Button } from "@mui/material";
import { Trans, useTranslation } from "next-i18next";
import theme from "@/styles/theme";
import { useSearchParams } from "next/navigation";
import SuccessPageLayout from "@/components/SuccessPageLayout";
import Link from "next/link";
import routes from "@/common/constants/routes";

const AccountRequestResetPasswordSentPageBody = () => {
  const { t } = useTranslation("accountResetPasswordSent");

  const searchParams = useSearchParams();
  const email = searchParams?.get("email");

  return (
    <SuccessPageLayout>
      <Typography variant="hL">
        {t("account_reset_password_sent.link_sent")}
      </Typography>
      <Typography
        variant="bodyM"
        textAlign="center"
        sx={{
          overflowWrap: "break-word",
          marginTop: theme.spacing(-1),
        }}
        color={theme.palette.grey[600]}
        maxWidth={theme.spacing(39)}
      >
        <Trans
          t={t}
          i18nKey="account_reset_password_sent.subtitle"
          values={{ email: email || "" }}
          components={{
            bold: <strong key="account_reset_password" />,
          }}
        />
      </Typography>
      <Button
        sx={{ height: theme.spacing(6) }}
        component={Link}
        href={routes.ACCOUNT}
        fullWidth
        variant="outlined"
        color="primary"
        size="large"
        disabled={false}
        data-testid="dti-back-to-account"
        data-analytics="back-to-account"
      >
        {t("account_reset_password_sent.btn.back")}
      </Button>
    </SuccessPageLayout>
  );
};

export default AccountRequestResetPasswordSentPageBody;
