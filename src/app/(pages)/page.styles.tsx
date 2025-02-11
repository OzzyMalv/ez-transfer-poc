// "use client";

import styled from "@emotion/styled";
import { Container } from "@mui/system";
import theme, { withTransientProps } from "@/styles/theme";
import { Box } from "@mui/material";
import routes from "@/common/constants/routes";

export const ResponsiveContainer = styled(Container)`
  && {
    display: flex;

    ${theme.breakpoints.only("lg")} {
      padding: ${(p) => p.theme.spacing(0, 9.5, 0, 9.5)};
    }
    ${theme.breakpoints.only("sm")} {
      padding: ${(p) => p.theme.spacing(7.75, 10.5, 0, 10.5)};
    }
    ${theme.breakpoints.down("md")} {
      flex-direction: column;
    }
  }
`;

export const MainWrapper = styled.main`
  && {
    ${theme.breakpoints.up("xs")} {
      height: calc(100% - ${theme.spacing(7)});
    }
    ${theme.breakpoints.up("sm")} {
      height: calc(100% - ${theme.spacing(8)});
    }
    ${theme.breakpoints.up("md")} {
      margin-top: ${theme.spacing(10)};
      height: calc(100dvh - ${theme.spacing(10)});
    }
    display: flex;
    width: 100%;
  }
`;

export const HomeMainWrapper = styled.main`
  && {
    width: 100%;
  }
`;

type PricingContainerProps = {
  $pathname: string;
};

export const PricingMainWrapper = styled(
  Box,
  withTransientProps,
)<PricingContainerProps>`
  && {
    width: 100%;
    padding: ${(p) =>
      p.$pathname === routes.PRICING
        ? p.theme.spacing(17, 2, 0)
        : p.theme.spacing(10, 2, 0)};

    ${theme.breakpoints.down("sm")} {
      padding-top: ${(p) => p.theme.spacing(4)};
    }
  }
`;
