"use client";

import { withTransientProps } from "@/styles/theme";
import styled from "@emotion/styled";
import { Box, Avatar } from "@mui/material";

interface IBurgerMenu {
  $toggleMobileNavigation: boolean;
}

interface IAvatar {
  $menuOpen: boolean;
  $menuLocation: string;
  background?: string;
}

export const MobileWrapper = styled(Box)`
  && {
    width: 100vw;
    height: 100dvh;
    position: fixed;
    background: #fff;
    z-index: 1;
    top: 0;
    left: 0;
    padding: 80px 8px 24px;
    display: flex;
    flex-direction: column;
    align-items: start;
  }
`;

export const MobileAuthNavigationWrapper = styled(Box)`
  && {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    padding: 0 24px 16px;
  }
`;

const BurgerMenuLine = styled(Box)`
  && {
    height: 2px;
    width: 20px;
    background: rgba(180, 180, 180, 1);
    transition: all 0.35s ease;
  }
`;

export const BurgerMenuTopLine = styled(
  BurgerMenuLine,
  withTransientProps,
)<IBurgerMenu>`
  && {
    transform: ${(p) =>
      p.$toggleMobileNavigation
        ? "translateY(1px) rotate(45deg)"
        : "translateY(-2px)"};
  }
`;

export const BurgerMenuBottomLine = styled(
  BurgerMenuLine,
  withTransientProps,
)<IBurgerMenu>`
  && {
    transform: ${(p) =>
      p.$toggleMobileNavigation
        ? "translateY(-1px) rotate(-45deg)"
        : "translateY(2px)"};
  }
`;

export const BurgerMenuWrapper = styled(Box)`
  && {
    height: 20px;
    width: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const UserAvatar = styled(Avatar, withTransientProps)<IAvatar>`
  && {
    height: ${(p) => p.theme.spacing(5)};
    width: ${(p) => p.theme.spacing(5)};
    background: ${(p) => p.background ?? "#a041ff"};
    outline: ${(p) =>
      p.$menuOpen && p.$menuLocation === "outside"
        ? "2px solid #ffffff"
        : "none"};
  }
`;
