import styled from "@emotion/styled";
import { Box, Menu } from "@mui/material";
import theme from "@/styles/theme";

export const ListFilesToolbarBoxStyled = styled(Box)`
  && {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${(p) => p.theme.spacing(1)};
    height: ${(p) => p.theme.spacing(7)};
    padding: ${({ theme }) => theme.spacing(0, 1)};
    ${theme.breakpoints.up("md")} {
      gap: ${(p) => p.theme.spacing(2)};
      height: ${(p) => p.theme.spacing(5)};
    }
  }
`;

export const LeftToolbarBoxStyled = styled(Box)`
  && {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${(p) => p.theme.spacing(2)};
    flex: 1;
    ${theme.breakpoints.up("md")} {
      justify-content: flex-start;
    }
  }
`;

export const AddFileMenuStyled = styled(Menu)`
  && {
    & .MuiPaper-root {
      border-radius: ${({ theme }) => theme.spacing(1.5)};
      padding: ${({ theme }) => theme.spacing(1)};
      background: #555;
      margin-top: ${({ theme }) => theme.spacing(0.75)};
      color: #fff;
      width: ${({ theme }) => theme.spacing(30)};
    }
    & .MuiMenuItem-root {
      padding: ${({ theme }) => theme.spacing(0.75, 1.5)};
    }
    & .MuiMenuItem-root:hover {
      background: #4b4b4b;
      border-radius: ${({ theme }) => theme.spacing(1)};
      padding: ${({ theme }) => theme.spacing(0.75, 1.5)};
    }
    & .MuiListItemIcon-root {
      min-width: ${({ theme }) => theme.spacing(3)};
    }
    & .MuiList-root {
      padding: ${({ theme }) => theme.spacing(0)};
    }
  }
`;
