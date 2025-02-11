import theme from "@/styles/theme";
import styled from "@emotion/styled";

export const MainPreviewWrapper = styled.main`
  && {
    ${theme.breakpoints.up("xs")} {
      padding: ${(p) => p.theme.spacing(2)};
    }
    ${theme.breakpoints.up("sm")} {
      padding: ${(p) => p.theme.spacing(3)};
    }
    width: 100%;
    //height: 100%;
    background-color: #fff;
  }
`;
