"use client";

import { usePathname } from "next/navigation";
import styled from "@emotion/styled";
import { FC, useEffect } from "react";
import { keyframes } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { setAnimateTo } from "@/store/slices/settings.slice";
import { selectReceiverConfirmedOrLoading } from "@/store/slices/receiver.slice";
import { withTransientProps } from "@/styles/theme";

// todo this flags are useless
interface ContainerProps {
  $route: string;
  $path: string;
  $isReceiverConfirmed: boolean;
}

export const Container = styled("div", withTransientProps)<ContainerProps>`
  width: 100%;
`;

const topAnimation = keyframes({
  "0%": {
    top: "100%",
    borderTopLeftRadius: "0",
    borderTopRightRadius: "0",
  },
  "70%": {
    top: "30%",
    borderTopLeftRadius: "90% 30%",
    borderTopRightRadius: "90% 30%",
  },
  "100%": {
    top: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});

export const OvelayBg = styled(Container)`
  animation: ${topAnimation} 2s cubic-bezier(0.41, 0.28, 0.87, 0.55);
  z-index: 12;
`;

interface Props {
  children: React.ReactNode;
}
const BackgroundContainer: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const asPath = usePathname() || "";
  const isReceiverConfirmedOrLoading = useAppSelector(
    selectReceiverConfirmedOrLoading,
  );

  useEffect(() => {
    dispatch(setAnimateTo(null));
  }, [dispatch, asPath]);

  return (
    <>
      {/** please do not remove the following commented line, will be decided with the design team next time. currently it's disabled */}
      {/* {animateTo !== null && <OvelayBg route={animateTo} />} */}
      <Container
        id="bgWrapper"
        data-testid="dti-bgWrapper"
        $route={asPath}
        $path={asPath}
        $isReceiverConfirmed={isReceiverConfirmedOrLoading}
      >
        {children}
      </Container>
    </>
  );
};

export default BackgroundContainer;
