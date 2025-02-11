"use client";

import { withTransientProps } from "@/styles/theme";
import theme from "@/styles/theme";
import styled from "@emotion/styled";

interface IHeaderWrapper {
  $isPageWithBottomBorder?: boolean;
}

export const HeaderWrapper = styled(
  "header",
  withTransientProps,
)<IHeaderWrapper>`
  && {
    display: flex;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    z-index: 123;

    position: fixed;
    height: ${({ theme }) => theme.spacing(8)};
    padding: ${({ theme }) => theme.spacing(1.5, 2)};
    gap: ${({ theme }) => theme.spacing(1)};
    flex-direction: row;
    align-self: stretch;
    background-color: ${({ theme }) => theme.palette.background.paper};

    ${theme.breakpoints.up("md")} {
      padding-left: ${({ theme }) => theme.spacing(10)};
    }
    ${theme.breakpoints.up("lg")} {
      padding-left: ${({ theme }) => theme.spacing(36)};
    }
  }
`;
