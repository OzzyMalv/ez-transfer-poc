"use client";
import { FC, ReactElement, useEffect } from "react";

import styled from "@emotion/styled";
import BackgroundContainer from "@/components/shared/BackgroundContainer";
import { usePathname, useRouter } from "next/navigation";
import routes from "@/common/constants/routes";

interface Props {
  children: ReactElement;
}

export const Container = styled("div")`
  background-color: #171517;
  height: 100dvh;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: -1;
  display: flex;
`;

const LayoutNotFound: FC<Props> = ({ children }) => {
  const pathname = usePathname() || "";
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("auth");
    if (!isLoggedIn) {
      if (pathname === routes.SEND) {
        return router.push(routes.HOME);
      }
    }

    if (isLoggedIn) {
      if (pathname === routes.SEND) {
        return router.push(routes.WORKSPACES);
      }
    }
  });

  return (
    <Container>
      <BackgroundContainer>{children}</BackgroundContainer>
    </Container>
  );
};

export default LayoutNotFound;
