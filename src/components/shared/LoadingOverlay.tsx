import React from "react";
import { Backdrop } from "@mui/material";
import styled from "@emotion/styled";
import AnimationPageLoading from "./animations/AnimationPageLoading";

const StyledBackdrop = styled(Backdrop)`
  && {
    z-index: ${(p) => p.theme.zIndex.drawer + 1};
    background-color: #f7efff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

interface ILoadingOverlayProps {
  open: boolean;
}

const LoadingOverlay = ({ open }: ILoadingOverlayProps) => {
  return (
    <StyledBackdrop open={open}>
      <AnimationPageLoading />
    </StyledBackdrop>
  );
};

export default LoadingOverlay;
