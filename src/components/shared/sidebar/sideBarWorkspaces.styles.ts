"use client";

import styled from "@emotion/styled";
import { Avatar, Box, Chip, ListItemButton } from "@mui/material";
import theme, { withTransientProps } from "@/styles/theme";

interface IBarWrapperProps {
  $isCollapsed?: boolean;
  $isOpenOnMobileOrTablet?: boolean;
}

export const BarWrapper = styled(Box, withTransientProps)<IBarWrapperProps>`
  && {
    position: fixed;
    top: 0;
    display: flex;
    width: ${({ theme, $isCollapsed }) =>
      $isCollapsed ? theme.spacing(7) : theme.spacing(33)};
    height: 100dvh;
    padding-bottom: ${({ theme }) => theme.spacing(2)};
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
    z-index: 9999;
    border-right: 1px solid #eee;
    background-color: ${({ theme }) => theme.palette.background.paper};

    transition: width 0.4s ease;

    ${theme.breakpoints.down("md")} {
      display: ${({ $isOpenOnMobileOrTablet }) =>
        $isOpenOnMobileOrTablet ? "flex" : "none"};
      position: static;
      width: ${({ theme }) => theme.spacing(38)};
    }
    //will-change: width;
  }
`;

export const ListWrapper = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing(2)};
    align-self: stretch;
    padding: ${({ theme }) => theme.spacing(0, 1.25)};
  }
`;

export const ListItemButtonStyled = styled(ListItemButton)`
  && {
    display: flex;
    align-items: center;
    align-self: stretch;
    height: ${({ theme }) => theme.spacing(4.5)};
    padding: 4px 8px 4px 6px;
    gap: 8px;

    border-radius: 12px;
  }
`;

export const AvatarListStyled = styled(Avatar)`
  && {
    background-color: #c273ff;
    width: ${({ theme }) => theme.spacing(3)};
    height: ${({ theme }) => theme.spacing(3)};
    border-radius: 8px;
  }
`;

export const TrialChipStyled = styled(Chip)`
  && {
    cursor: pointer;
    font-size: 10px;
    color: #8d50d8;
    background-color: rgba(160, 65, 255, 0.16);
    height: ${(p) => p.theme.spacing(2.75)};
    font-weight: bold;

    & .MuiChip-label {
      padding: ${(p) => p.theme.spacing(0, 0.75)};
    }
    text-transform: uppercase;
  }
`;
