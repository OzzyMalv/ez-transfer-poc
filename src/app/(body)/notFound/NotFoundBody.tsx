"use client";

import { Box, Container, Link, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import theme from "@/styles/theme";
import styled from "@emotion/styled";
import routes from "@/common/constants/routes";

const NotFoundTypography = styled(Typography)`
  color: ${(p) => p.theme.palette.secondary.main};
`;

const GoBackTypography = styled(NotFoundTypography)`
  color: ${(p) => p.theme.palette.secondary.main};
  border-bottom: 1px solid ${(p) => p.theme.palette.secondary.main + "50"};
`;

const GoBackLink = styled(Link)`
  padding: ${(p) => p.theme.spacing(0.5)} 0;
`;

const NotFoundBody = () => {
  const { t } = useTranslation("notFound");
  return (
    <Container maxWidth="xl">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh", marginTop: 0 }}
      >
        <Box
          display="flex"
          gap={6}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            data-testid="dti-seeking-eyes-img"
            src="/img/404.svg"
            width={211}
            height={111}
            priority
            quality={100}
            alt=""
          />
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <NotFoundTypography variant="displayS">404</NotFoundTypography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              sx={{
                "&&": {
                  maxWidth: theme.spacing(56),
                  marginTop: theme.spacing(1),
                },
              }}
            >
              <NotFoundTypography variant="body1" textAlign="center">
                {t("notFound.paragraph")}
              </NotFoundTypography>
              <GoBackLink
                data-testid="dti-go-to-home"
                href={routes.HOME}
                underline="none"
                sx={{
                  marginTop: theme.spacing(3),
                }}
                rel="noopener noreferrer"
              >
                <GoBackTypography variant="h4" fontSize={20} lineHeight={1}>
                  {t("notFound.takeMeHome")}
                </GoBackTypography>
              </GoBackLink>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFoundBody;
