import styled from "@emotion/styled";
import { Fab } from "@mui/material";
import { pulseAnimation } from "@/styles/animations";

export const FabBtnStyled = styled(Fab)`
  && {
    animation: ${(p) => (p.size !== "small" ? pulseAnimation : "none")} 1.5s
      infinite cubic-bezier(0.79, 0.62, 0.76, 0.96);
    outline: 1px solid #000;
    display: flex;
    color: #fff;
    z-index: 0;
    box-shadow: none;
  }
`;
