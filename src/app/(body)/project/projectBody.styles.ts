"use client";

import styled from "@emotion/styled";
import { Box, Button, Divider } from "@mui/material";
import theme from "@/styles/theme";
import Image from "next/image";

export const ContainerStyled = styled(Box)`
  && {
    display: flex;
    gap: ${({ theme }) => theme.spacing(2)};
    margin-top: ${({ theme }) => theme.spacing(7)};
    padding: ${({ theme }) => theme.spacing(2)};
    flex-direction: column-reverse;
    ${theme.breakpoints.up("md")} {
      flex-direction: row;
      padding: 0;
      gap: ${({ theme }) => theme.spacing(3)};
      margin-top: ${({ theme }) => theme.spacing(10)};
      margin-left: ${({ theme }) => theme.spacing(10)};
    }
  }
`;

export const ContainerListBoxStyled = styled(Box)`
  & {
    display: flex;
    flex-direction: column;
    gap: 0;
    flex: 1;
    min-width: 0;
    ${theme.breakpoints.up("md")} {
      gap: ${({ theme }) => theme.spacing(2)};
    }
  }
`;

export const FormBoxStyled = styled(Box)`
  && {
    padding: 0;
    ${theme.breakpoints.up("md")} {
      padding-right: ${({ theme }) => theme.spacing(2)};
    }
  }
`;

export const StyledDrawer = styled(Box)`
  && {
    padding: ${(p) => p.theme.spacing(4)};
  }
`;

export const StyledHeaderImageContainer = styled(Box)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: ${(p) => p.theme.spacing(4)};
  }
`;

export const StyledHeaderImage = styled(Image)`
  && {
    max-width: 100%;
    height: auto;
  }
`;

export const CloseIconContainer = styled(Button)`
  && {
    width: ${(p) => p.theme.spacing(4)};
    height: ${(p) => p.theme.spacing(4)};
    position: absolute;
    top: ${(p) => p.theme.spacing(3)};
    left: ${(p) => p.theme.spacing(2.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(p) => p.theme.palette.grey[100]};
    padding: 0;
    min-width: auto;
  }
`;

export const StyledDivider = styled(Divider)`
  && {
    margin: ${(p) => p.theme.spacing(3, 0, 4)};
    border-color: #f1f1f1;
  }
`;

export const TransferCopyLinkWrapper = styled(Box)`
  && {
    display: block;
    width: 100%;
  }
`;

export const TransferGeneratingWrapper = styled(Box)`
  && {
    width: 100%;
    display: flex;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: ${(p) => p.theme.spacing(1)};
    height: ${(p) => p.theme.spacing(5)};
    padding: ${(p) => p.theme.spacing(0.5, 1.5)};
  }
`;
