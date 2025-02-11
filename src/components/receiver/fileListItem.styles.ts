import styled from "@emotion/styled";
import { Box, ListItem } from "@mui/material";
import theme, { withTransientProps } from "@/styles/theme";

interface IFileListItemStyled {
  $failed: boolean;
}

export const FileListItemStyledWrapper = styled(
  Box,
  withTransientProps,
)<IFileListItemStyled>`
  && {
    background: ${(p) => (p.$failed ? "#FFF8F4" : "#fff")};
    width: 100%;
    height: 100%;
    border-radius: ${(p) => p.theme.spacing(2)};
  }
`;

export const FileListItemStyled = styled(ListItem)`
  && {
    display: flex;
    padding: ${(p) => p.theme.spacing(1)};
    border-radius: ${(p) => p.theme.spacing(1.5)};
    border: 1px solid #eee;
    height: ${(p) => p.theme.spacing(6.5)};
    gap: ${(p) => p.theme.spacing(1.5)};
    transition:
      background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    :hover {
      background: rgba(0, 0, 0, 0.04);
      cursor: pointer;
    }

    ${theme.breakpoints.up("md")} {
      gap: ${(p) => p.theme.spacing(2)};
      height: ${(p) => p.theme.spacing(7.5)};
      padding: ${(p) => p.theme.spacing(0, 1.5, 0, 0)};
      border-radius: ${(p) => p.theme.spacing(2)};
    }
  }
` as unknown as typeof ListItem;

export const FilePreviewIconBoxStyled = styled(Box)`
  && {
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${(p) => p.theme.palette.grey[700]};

    width: ${(p) => p.theme.spacing(4.5)};
    height: ${(p) => p.theme.spacing(4.5)};
    border-radius: ${(p) => p.theme.spacing(1)};

    ${theme.breakpoints.up("md")} {
      width: ${(p) => p.theme.spacing(10.5)};
      height: ${(p) => p.theme.spacing(7.5)};
      border-radius: ${(p) => p.theme.spacing(2)};
    }
    & svg,
    & img {
      width: ${(p) => p.theme.spacing(2)};
      height: ${(p) => p.theme.spacing(2)};
    }
  }
`;

export const FilePreviewBoxStyled = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: ${(p) => p.theme.spacing(1)};

    & svg,
    & img {
      object-fit: cover;
      border-radius: ${(p) => p.theme.spacing(1)};
      ${theme.breakpoints.down("md")} {
        width: ${(p) => p.theme.spacing(4.5)};
        height: ${(p) => p.theme.spacing(4.5)};
        border-radius: ${(p) => p.theme.spacing(1)};
      }
      ${theme.breakpoints.up("md")} {
        width: ${(p) => p.theme.spacing(10.5)};
        height: ${(p) => p.theme.spacing(7.5)};
        border-radius: ${(p) => p.theme.spacing(2)};
      }
    }
  }
`;
