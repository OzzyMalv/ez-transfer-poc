"use client";

import { withTransientProps } from "@/styles/theme";
import theme from "@/styles/theme";
import styled from "@emotion/styled";
import { Box, Button, IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export const HeaderWrapper = styled("header", withTransientProps)`
  && {
    display: flex;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    z-index: 123;

    position: fixed;
    height: ${({ theme }) => theme.spacing(7)};
    padding: ${({ theme }) => theme.spacing(1.5, 2)};
    gap: ${({ theme }) => theme.spacing(1.5)};
    flex-direction: row;
    align-self: stretch;
    background-color: ${({ theme }) => theme.palette.background.paper};
    border-bottom: 1px solid #eee;

    ${theme.breakpoints.up("md")} {
      left: ${({ theme }) => theme.spacing(7)};
      padding-left: ${({ theme }) => theme.spacing(3)};
      height: ${({ theme }) => theme.spacing(10)};
      border-bottom: none;
    }
  }
`;

export const HeaderTitleWrapper = styled(Box)`
  && {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex: 1;
  }
`;

export const EditOutlinedIconStyled = styled(EditOutlinedIcon)`
  && {
    font-size: 16px;
  }
`;

export const EditNameModal = styled(Box)`
  && {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 460px;
    background: ${(p) => p.theme.palette.black[800]};
    border: none;
    box-shadow: 24;
    padding: ${(p) => p.theme.spacing(2.5, 2, 2)};
    border-radius: ${(p) => p.theme.spacing(2)};

    ${theme.breakpoints.down("sm")} {
      width: 360px;
  }
`;

export const EditNameModalButtonContainer = styled(Box)`
  && {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    margin-top: ${(p) => p.theme.spacing(2)};
  }
`;

export const EditNameModalButtonCancel = styled(Button)`
  && {
    background: none;
    color: ${(p) => p.theme.palette.black[300]};
    border-color: ${(p) => p.theme.palette.grey[800]};
    margin-right: ${(p) => p.theme.spacing(1)};
    font-size: 13px;
    font-weight: 500;
    padding: ${(p) => p.theme.spacing(0.5, 1.5)};
  }
`;

export const EditNameModalButtonSave = styled(Button)`
  && {
    border-color: #ffffff;
    font-size: 13px;
    font-weight: 500;
    padding: ${(p) => p.theme.spacing(0.5, 1.5)};
  }
`;

export const IconButtonClose = styled(IconButton)`
  && {
    font-size: 16px;
    position: absolute;
    top: ${(p) => p.theme.spacing(1.5)};
    right: ${(p) => p.theme.spacing(1)};
  }
`;
