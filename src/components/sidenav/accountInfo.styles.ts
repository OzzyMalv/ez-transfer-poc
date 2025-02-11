"use client";

import theme from "@/styles/theme";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import Link from "next/link";
import CallMadeRoundedIcon from "@mui/icons-material/CallMadeRounded";

export const AccountWrapper = styled(Box)`
  && {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(2)};
    align-self: stretch;
    padding: ${(p) => p.theme.spacing(1, 0)};
    margin: auto;
    transition: all 0.4s ease;
    border-radius: 0;
    width: calc(100% - ${theme.spacing(3)});
    font-size: 13px;
    min-width: 0;
    cursor: pointer;

    &:hover {
      background: none;
    }
  }
`;

export const AccountMenu = styled(Box)`
  && {
    width: calc(100% - ${theme.spacing(3)});
    margin: 0 auto ${(p) => p.theme.spacing(1)};
    border: 1px solid ${(p) => p.theme.palette.grey[200]};
    border-radius: ${(p) => p.theme.spacing(1.5)};
    padding: ${(p) => p.theme.spacing(1)};
  }
`;

export const StyledLink = styled(Link)`
  && {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: ${(p) => p.theme.spacing(0, 1.5)};
  }
`;

export const StyledNewTabIcon = styled(CallMadeRoundedIcon)`
  && {
    align-self: flex-end;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const StyledLinkButton = styled("button")`
  && {
    display: flex;
    align-items: center;
    text-align: "left";
    width: 100%;
    padding: ${(p) => p.theme.spacing(1, 1.5)};
    background: none;
    border: none;
    cursor: pointer;

    &:hover {
      background: none;
    }
  }
`;

export const StyledExpandContainer = styled(Box)`
  && {
    border: 1px solid rgba(0, 0, 0, 0.23);
    border-radius: ${(p) => p.theme.spacing(1)};
    width: ${(p) => p.theme.spacing(3)};
    height: ${(p) => p.theme.spacing(3)};
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const AccountMenuInfo = styled(Box)`
  && {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: ${(p) => p.theme.spacing(1, 1, 2, 0.5)};
    width: 100%;
  }
`;

export const AccountMenuInfoText = styled(Box)`
  && {
    padding-left: ${(p) => p.theme.spacing(1.5)};
    width: calc(100% - ${(p) => p.theme.spacing(5)});
    display: block;
  }
`;
