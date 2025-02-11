import theme from "@/styles/theme";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const AccountPageLayoutWrapper = styled(Box)`
  && {
    display: flex;
    height: 100dvh;
    ${theme.breakpoints.up("xs")} {
      flex-direction: column;
      margin: ${(p) => p.theme.spacing(0, 2)};
      gap: ${(p) => p.theme.spacing(2)};
      width: calc(100% - ${(p) => p.theme.spacing(4)});
    }

    ${theme.breakpoints.up("md")} {
      flex-direction: row;
      margin: ${(p) => p.theme.spacing(10, 3, 0, 3)};
      gap: ${(p) => p.theme.spacing(4)};
      width: auto;
    }
  }
`;

export const AccountSidebarSettings = styled(Box)`
  && {
    display: flex;
    height: 100%;
    ${theme.breakpoints.up("xs")} {
      width: auto;
    }
    ${theme.breakpoints.up("md")} {
      width: ${(p) => p.theme.spacing(28.75)};
    }
  }
`;
