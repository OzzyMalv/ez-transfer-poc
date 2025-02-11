import styled from "@emotion/styled";
import { Button, FormControlLabel, MenuItem } from "@mui/material";

export const StyledSafeAreaMenuContainer = styled("div")`
  && {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
`;

export const StyledSafeAreaButton = styled(Button)`
  height: ${(p) => p.theme.spacing(4)};
  border-radius: ${(p) => p.theme.spacing(1.5)};
  .MuiButton-endIcon {
    margin-left: 0;
  }

  @media screen and (max-width: 780px) {
    border-radius: 0;
    border: none;
  }
`;

export const StyledSafeAreaMenuItem = styled(MenuItem)`
  && {
    padding: ${(p) => p.theme.spacing(1.5, 2)};
    &:hover {
      background: none;
    }
  }
`;

export const StyledFormControlLabelSafeArea = styled(FormControlLabel)`
  && {
    padding: ${(p) => p.theme.spacing(0.5, 2)};
    margin-right: 0;
  }
`;
