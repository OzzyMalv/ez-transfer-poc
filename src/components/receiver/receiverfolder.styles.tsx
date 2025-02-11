import { withTransientProps } from "@/styles/theme";
import styled from "@emotion/styled";
import { Box, Collapse, ListItem } from "@mui/material";

interface IReceiverFolderProps {
  $open: boolean;
}

export const ReceiverFolderListItem = styled(
  ListItem,
  withTransientProps,
)<IReceiverFolderProps>`
  && {
    cursor: pointer;
    display: flex;
    padding: ${(p) => p.theme.spacing(0, 1.5, 0, 1.5)};
    border-radius: ${(p) => p.theme.spacing(1.5)};
    background: ${(p) => (p.$open ? "#F5F5F5" : "#fff")};
    margin-bottom: ${(p) =>
      p.$open ? p.theme.spacing(0) : p.theme.spacing(2)};
    height: ${(p) => p.theme.spacing(7.5)};
    box-shadow: ${(p) =>
      p.$open ? "1px 1px 0 #ddd inset, 1px 0 0 #ddd" : "none"};
    border-bottom-left-radius: ${(p) =>
      p.$open ? p.theme.spacing(0) : p.theme.spacing(1.5)};
    border-bottom-right-radius: ${(p) =>
      p.$open ? p.theme.spacing(0) : p.theme.spacing(1.5)};
    transition:
      background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    :hover {
      background: ${(p) => (p.$open ? "#F5F5F5" : "rgba(0, 0, 0, 0.04)")};
    }
  }
`;

export const CollapsedFolderWrapper = styled(Collapse)`
  && {
    padding: ${(p) => p.theme.spacing(1, 1, 0, 1)};
    padding-left: ${(p) => p.theme.spacing(1)};
    padding-right: ${(p) => p.theme.spacing(1)};
    margin-bottom: ${(p) => p.theme.spacing(2)};
    border-bottom-left-radius: ${(p) => p.theme.spacing(2)};
    border-bottom-right-radius: ${(p) => p.theme.spacing(2)};
    box-shadow:
      1px 0 0 #ddd inset,
      1px 1px 0 #ddd;
  }
`;

export const SubFolderWrapper = styled(Box)``;

export const SubFolder = styled(Box)`
  && {
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 8px;
  }
`;
