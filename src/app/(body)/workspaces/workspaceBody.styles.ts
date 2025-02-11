"use client";

import styled from "@emotion/styled";
import { Box } from "@mui/material";
import theme from "@/styles/theme";

export const ContainerStyled = styled(Box)`
  && {
    height: 100%;
    padding-top: ${({ theme }) => theme.spacing(10)};
    ${theme.breakpoints.up("md")} {
      padding-left: ${({ theme }) => theme.spacing(33)};
    }
  }
`;

export const CardsBoxStyled = styled(Box)`
  && {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing(2)};
    align-self: stretch;
    padding: ${({ theme }) => theme.spacing(0, 2)};

    ${theme.breakpoints.up("md")} {
      padding-left: ${({ theme }) => theme.spacing(4)};
    }
  }
`;
