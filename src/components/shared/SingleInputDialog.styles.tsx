import styled from "@emotion/styled";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import theme from "@/styles/theme";

export const StyledDialog = styled(Dialog)`
  && .MuiDialog-container {
    align-items: flex-start;
    padding-top: ${({ theme }) => theme.spacing(15)};
  }
  && .MuiDialog-paper {
    width: ${({ theme }) => theme.spacing(50)};
    padding-bottom: ${({ theme }) => theme.spacing(1)};
    background: #2f302f;

    border-radius: ${(p) => p.theme.spacing(2)};
  }
`;

export const StyledDialogContent = styled(DialogContent)`
  && {
    padding: ${({ theme }) => theme.spacing(0, 2, 2)};
  }
`;

export const StyledDialogActions = styled(DialogActions)`
  && {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(1)};

    padding: ${({ theme }) => theme.spacing(1, 2)};

    ${theme.breakpoints.up("md")} {
      flex-direction: row;
      gap: 0;
    }
  }
`;

export const StyledButton = styled(Button)`
  && {
    width: 100%;
    border-radius: ${({ theme }) => theme.spacing(3)};
    border: 1px solid #4e4e4f;
    ${theme.breakpoints.up("md")} {
      width: auto;
    }
  }
`;

export const StyledButtonConfirm = styled(Button)`
  && {
    width: 100%;
    background: #fff;
    margin: 0;
    ${theme.breakpoints.up("md")} {
      width: auto;
      margin-left: ${({ theme }) => theme.spacing(1)};
    }
    &:hover {
      border: 1px solid #4e4e4f;
    }
  }
`;
