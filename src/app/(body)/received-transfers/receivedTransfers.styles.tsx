"use client";
import theme from "@/styles/theme";
import { ArrowDownwardRounded } from "@mui/icons-material";
import { Box, IconButton, ListItemText, Typography } from "@mui/material";
import { Avatar, Chip, ListItem } from "@mui/material";
import { styled } from "@mui/system";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";

export const StyledChip = styled(Chip)`
  && {
    border: 1px solid ${(p) => p.theme.palette.grey[200]};
    border-radius: 8px;
    color: ${(p) => p.theme.palette.grey[600]};
    margin-left: auto;
  }
`;

export const StyledAvatar = styled(Avatar)`
  && {
    background-color: ${(p) => p.theme.palette.grey[200]};
    color: ${(p) => p.theme.palette.grey[600]};
    font-size: 20px;
    width: ${(p) => p.theme.spacing(4)};
    height: ${(p) => p.theme.spacing(4)};
  }
`;

export const StyledArrowDownwardRounded = styled(ArrowDownwardRounded)`
  && {
    color: ${(p) => p.theme.palette.grey[600]};
    font-size: 16px;
  }
`;

export const ReceivedTransferRow = styled(ListItem)`
  && {
    border: 1px solid ${(p) => p.theme.palette.grey[200]};
    border-radius: 16px;
    :hover {
      background-color: ${(p) => p.theme.palette.grey[100]};
      cursor: pointer;
    }
    margin: ${(p) => p.theme.spacing(1, 0)};
  }
`;

export const ReceivedTransferBodyWrapper = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 100vh;
    background-color: ${(p) => p.theme.palette.background.default};
    padding: ${(p) => p.theme.spacing(0, 3)};
    ${theme.breakpoints.down("md")} {
      padding-top: ${(p) => p.theme.spacing(8)};
    }
    ${theme.breakpoints.between("md", "lg")} {
      padding: ${(p) => p.theme.spacing(8, 4, 0, 4)};
    }
    ${theme.breakpoints.up("lg")} {
      padding-top: ${(p) => p.theme.spacing(2)};
    }
  }
`;

export const ReceivedTransferListItemsWrapper = styled(Box)`
  && {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex: 1;
    ${theme.breakpoints.down("sm")} {
      flex-wrap: wrap;
    }
    padding: ${(p) => p.theme.spacing(1)};
    margin-right: ${(p) => p.theme.spacing(4)};
  }
`;

export const ReceivedTransferListItemText = styled(ListItemText)`
  && {
    max-width: ${(p) => p.theme.spacing(42)};
    ${theme.breakpoints.up("xl")} {
      max-width: ${(p) => p.theme.spacing(50)};
    }
    ${theme.breakpoints.down("sm")} {
      max-width: ${(p) => p.theme.spacing(26)};
    }
  }
`;

export const ReceivedTransferBodyContentWrapper = styled(Box)`
  && {
    height: auto;
    min-height: 100%;

    padding-top: 0;
    ${theme.breakpoints.up("md")} {
      padding-left: ${({ theme }) => theme.spacing(6)};
    }
    ${theme.breakpoints.up("lg")} {
      padding: ${({ theme }) => theme.spacing(6.5, 0, 0, 33)};
    }
  }
`;

export const EmptyReceivedTransfersWrapper = styled(Box)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    align-self: stretch;
    height: 100vh;
    background-color: ${(p) => p.theme.palette.background.default};
  }
`;

export const DownloadButton = styled(Box)`
  && {
    min-width: 0;
    padding-right: ${(p) => p.theme.spacing(1.5)};
    ${theme.breakpoints.down("sm")} {
      align-self: baseline;
      padding-top: ${(p) => p.theme.spacing(0.5)};
    }
  }
`;

export const ReceivedTransfersMoreOptions = styled(IconButton)`
  && {
    align-self: baseline;
    margin: ${(p) => p.theme.spacing(0, 0.5, 4, 0.5)};
    ${theme.breakpoints.up("sm")} {
      align-self: center;
      margin: ${(p) => p.theme.spacing(0, 0.5)};
    }
  }
`;

export const CommentWrapper = styled(Box)`
  && {
    padding: ${(p) => p.theme.spacing(0)};
    background-color: #fff;
    border-radius: 24px;
    max-height: ${(p) => p.theme.spacing(15)};
    margin: ${(p) => p.theme.spacing(2, 0, 0, 0)};
  }
}
`;

export const Comment = styled(Typography)`
  && {
    overflow-y: auto;
    overflow-wrap: anywhere;
    height: ${(p) => p.theme.spacing(12)};
    padding-right: ${(p) => p.theme.spacing(1)};
    padding-top: ${(p) => p.theme.spacing(1)};
    white-space: "pre-wrap";
    color: ${(p) => p.theme.palette.primary.light};
    font-weight: 400;

    ::-webkit-scrollbar {
      width: 4px;
    }
    ::-webkit-scrollbar-track {
      max-height: 50%;
      height: 50%;
    }

    ::-webkit-scrollbar-thumb {
      background: #888;
      box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
      border-radius: 100px;
      height: 60px;
    }
  }
`;

export const EmptyReceivedTransfersIcon = styled(ListAltRoundedIcon)`
  & {
    background-color: #f4eeff;
    color: #925eff;
    width: ${(p) => p.theme.spacing(5)};
    height: ${(p) => p.theme.spacing(5)};
    padding: ${(p) => p.theme.spacing(1.5)};
    margin-bottom: ${(p) => p.theme.spacing(1.5)};
    border-radius: ${(p) => p.theme.spacing(1)};
  }
`;
