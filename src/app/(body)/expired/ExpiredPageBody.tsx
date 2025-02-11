"use client";

import { Box, Grid, Link, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import theme from "@/styles/theme";
import { MainWrapper, ResponsiveContainer } from "@/app/(pages)/page.styles";
import routes from "@/common/constants/routes";

const ExpiredPageBody = () => {
  const { t } = useTranslation("expired");

  return (
    <MainWrapper>
      <ResponsiveContainer maxWidth="xl">
        <Grid container justifyContent="center" alignItems="center" flex={1}>
          <Grid
            item
            container
            xs={12}
            gap={6}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              data-testid="dti-dart-board-img"
              data-analytics="dart-board-img"
              src="/img/calendarCheck.svg"
              width={267}
              height={216}
              priority
              quality={100}
              alt=""
            />
            <Grid
              item
              container
              sm
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="hL"
                sx={{
                  typography: {
                    lg: "displayM",
                    sm: "displayS",
                  },
                }}
              >
                {t("expired.sender.heading")}
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{
                  maxWidth: theme.spacing(56),
                  marginTop: 1,
                }}
              >
                <Typography variant="bodyL" textAlign="center">
                  {t("expired.sender.description")}
                </Typography>
                <Link
                  sx={{
                    paddingTop: 3,
                  }}
                  href={routes.HOME}
                  underline="always"
                  rel="noopener noreferrer"
                >
                  <Typography variant="bodyXL">
                    {t("expired.sender.sendFiles")}
                  </Typography>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </ResponsiveContainer>
    </MainWrapper>
  );
};

export default ExpiredPageBody;
