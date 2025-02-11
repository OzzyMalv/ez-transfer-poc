"use client";

import { withTransientProps } from "@/styles/theme";
import theme from "@/styles/theme";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

interface IHeaderWrapper {
  $isPageWithBottomBorder: boolean;
  $isPageWithBottomBorderAndBackground: boolean;
}

export const HeaderWrapper = styled(Box, withTransientProps)<IHeaderWrapper>`
  && {
    display: flex;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    z-index: 123;
    ${theme.breakpoints.up("xs")} {
      height: ${theme.spacing(7)};
      padding: ${theme.spacing(1, 2)};
      position: relative;
    }
    ${theme.breakpoints.up("sm")} {
      height: ${theme.spacing(8)};
      padding: ${theme.spacing(1, 3)};
    }
    ${theme.breakpoints.up("md")} {
      height: ${theme.spacing(10)};
      position: fixed;
      border-bottom: ${(p) =>
        p.$isPageWithBottomBorder || p.$isPageWithBottomBorderAndBackground
          ? "1px solid #E0E0E0"
          : "none"};
    }

    background: ${(p) => p.$isPageWithBottomBorderAndBackground && "#ffffff"};
  }
`;
