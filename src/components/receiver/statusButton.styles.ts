import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const StatusButtonStyled = styled(Button)`
  && {
    height: ${(p) => p.theme.spacing(2.5)};
    padding: ${(p) => p.theme.spacing(0, 1)};
    .MuiButton-endIcon {
      margin-left: ${(p) => p.theme.spacing(1)};
    }

    :disabled {
      background-color: rgba(30, 31, 33, 0.06);
      border: none;
    }
  }
`;
