import styled from "@emotion/styled";
import { Box, Collapse, ListItem } from "@mui/material";
import theme, { withTransientProps } from "@/styles/theme";

interface IFolderListItemStyled {
  $open: boolean;
  $failed?: boolean;
}
export const FolderListItemStyled = styled(
  ListItem,
  withTransientProps,
)<IFolderListItemStyled>`
  && {
    cursor: pointer;
    display: flex;
    padding: ${(p) => p.theme.spacing(1)};
    height: ${(p) => p.theme.spacing(6.5)};
    gap: ${(p) => p.theme.spacing(1.5)};

    border-radius: ${(p) => p.theme.spacing(1.5)};

    border: 1px solid #eee;
    box-sizing: border-box;

    ${(p) => p.$open && !p.$failed && `background-color: #F5F5F5; `}

    ${(p) => !p.$open && ` background-color: #FFFFFF;`}

    ${(p) => p.$failed && `background-color: #FFF8F4;`}
 
    border-bottom: ${(p) => p.$open && "none"};

    border-bottom-left-radius: ${(p) =>
      p.$open ? p.theme.spacing(0) : p.theme.spacing(2)};
    border-bottom-right-radius: ${(p) =>
      p.$open ? p.theme.spacing(0) : p.theme.spacing(2)};
    transition:
      background-color 400ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      box-shadow 400ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      color 400ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      border-bottom-left-radius 0ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      border-bottom-right-radius 0ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    :hover {
      background: ${(p) => (p.$open ? "#F5F5F5" : "rgba(0, 0, 0, 0.04)")};
    }

    ${theme.breakpoints.up("md")} {
      height: ${(p) => p.theme.spacing(7.5)};
      gap: ${(p) => p.theme.spacing(2)};
      padding: ${(p) => p.theme.spacing(0, 1.5, 0, 0)};
      border-radius: ${(p) => p.theme.spacing(2)};
      border-bottom-left-radius: ${(p) =>
        p.$open ? p.theme.spacing(0) : p.theme.spacing(2)};
      border-bottom-right-radius: ${(p) =>
        p.$open ? p.theme.spacing(0) : p.theme.spacing(2)};
    }
  }
`;

interface IFolderPreviewIconBoxStyled {
  $failed?: boolean;
}

export const FolderPreviewIconBoxStyled = styled(
  Box,
  withTransientProps,
)<IFolderPreviewIconBoxStyled>`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: ${(p) => p.theme.spacing(4.5)};
    height: ${(p) => p.theme.spacing(4.5)};

    color: ${(p) => p.theme.palette.grey[700]};
    background-color: ${(p) => (p.$failed ? "#FFD3BE" : "#ffea73")};
    ${theme.breakpoints.up("md")} {
      width: ${(p) => p.theme.spacing(10.5)};
      height: ${(p) => p.theme.spacing(7.5)};
      border-radius: ${(p) => p.theme.spacing(2)};
    }
    border-radius: ${(p) => p.theme.spacing(1)};
  }
`;

export const FolderCollapseStyled = styled(Collapse)`
  && {
    background-color: #f5f5f5;
    border-bottom-left-radius: ${(p) => p.theme.spacing(2)};
    border-bottom-right-radius: ${(p) => p.theme.spacing(2)};
    box-shadow:
      -1px 0 0 #eee inset,
      -1px 1px 0 #eee;
  }
`;
