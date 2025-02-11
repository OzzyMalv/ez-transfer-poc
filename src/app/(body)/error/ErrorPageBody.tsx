"use client";

import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { MainWrapper } from "@/app/(pages)/page.styles";
import routes from "@/common/constants/routes";

const ErrorPageBody = () => {
  const { t } = useTranslation("error");

  return (
    <MainWrapper data-testid="dti-error-page" data-analytics="error-page">
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box marginRight={16} marginTop={{ xs: 24, md: 9 }}>
          <Image
            data-testid="dti-bees-img"
            src="/img/bees-img.svg"
            width={222}
            height={205}
            priority
            quality={100}
            alt="bees"
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding={2}
          gap={1}
        >
          <Typography
            variant="hM"
            sx={{
              typography: {
                md: "hL",
              },
            }}
          >
            {t("error.title")}
          </Typography>
          <Typography
            variant="bodyM"
            sx={{
              typography: {
                md: "bodyL",
              },
            }}
            color="textSecondary"
          >
            {t("error.subtitle")}
          </Typography>
        </Box>
        <Button
          component={Link}
          href={routes.HOME}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          data-testid="dti-start-new-transfer"
          data-analytics="start-new-transfer-error-page"
        >
          {t("error.newTransferBtn")}
        </Button>
      </Box>
    </MainWrapper>
  );
};

export default ErrorPageBody;
