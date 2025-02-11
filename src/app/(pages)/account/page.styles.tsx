"use client";
import styled from "@emotion/styled";
import { Box, ListItemButton } from "@mui/material";
import theme, { withTransientProps } from "@/styles/theme";

const AccountNavBox = styled(Box)`
  && {
    height: ${theme.spacing(4)};
    display: flex;
    cursor: pointer;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 10px;
    font-family: IBM Plex Sans;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.25px;
    text-align: left;

    ${theme.breakpoints.up("xs")} {
      text-align: center;
      width: 30%;
      padding-left: ${theme.spacing(0)};
      height: ${theme.spacing(4)};
    }

    ${theme.breakpoints.up("md")} {
      text-align: left;
      width: 80%;
      padding-left: ${theme.spacing(2)};
      height: ${theme.spacing(5)};
    }

    &.active_tab {
      border-radius: 12px;
      background: rgba(0, 0, 0, 0.08);
      font-weight: bold !important;
      text-decoration: none;
    }
  }
`;

export default AccountNavBox;

interface ListItemButtonProps {
  $isActive: boolean;
}

export const ListItemButtonWrapper = styled(
  ListItemButton,
  withTransientProps,
)<ListItemButtonProps>`
  && {
    border-radius: 12px;
    background: ${(p) => (p.$isActive ? "#EBEBEB" : "")};
    & .MuiListItemIcon-root {
      min-width: 0;
      ${theme.breakpoints.down("md")} {
        margin-right: ${theme.spacing(1)};
      }
      ${theme.breakpoints.up("md")} {
        margin-right: ${theme.spacing(1.5)};
      }
    }
    & .MuiListItemText-root {
      white-space: nowrap;
    }
  }
`;
