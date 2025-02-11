import theme from "@/styles/theme";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const CoutDownDesktop = styled(Box)`
  && {
    ${theme.breakpoints.down("sm")} {
      display: none;
    }
  }
`;

export const CoutDownMobile = styled(Box)`
  && {
    display: none;

    ${theme.breakpoints.down("sm")} {
      display: block;
    }
  }
`;
