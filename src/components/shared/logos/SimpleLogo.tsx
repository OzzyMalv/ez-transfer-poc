"use client";

import routes from "@/common/constants/routes";
import { useAppSelector } from "@/store";
import { selectIsLoggedIn } from "@/store/slices/auth.slice";
import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LogoContainer = styled("div")`
  cursor: pointer;
  z-index: 999;
  display: flex;
  align-items: center;
`;

const SimpleLogo = () => {
  const router = useRouter();
  const isUserLoggedIn = useAppSelector(selectIsLoggedIn);

  const onLogoClick = () => {
    return isUserLoggedIn
      ? router.push(routes.WORKSPACES)
      : router.push(routes.HOME);
  };

  return (
    <LogoContainer onClick={onLogoClick}>
      <Image
        src={"/img/logoNoText.svg"}
        width={24}
        height={24}
        alt="Logo"
        priority
        quality={10}
        data-testid="logo"
        data-analytics="logo"
      />
    </LogoContainer>
  );
};

export default SimpleLogo;
