"use client";

import { HeaderWrapper } from "@/components/shared/headers/header.styles";
import {
  pagesWithBottomBorder,
  pagesWithoutNavigationBar,
  pagesWithoutNavigationButtons,
  pagesWithBorderAndBackground,
} from "@/common/constants/pageSpecifics";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectShowNavigation,
  setShowNavigation,
} from "@/store/slices/settings.slice";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import SimpleLogo from "@/components/shared/logos/SimpleLogo";
import Navbar from "@/components/shared/navbar/Navbar";
import routes from "@/common/constants/routes";

const Header: FC = () => {
  const asPath = usePathname() || "";
  const dispatch = useAppDispatch();
  const hideNavigation =
    pagesWithoutNavigationBar.includes(asPath) ||
    asPath.startsWith(routes.USER);
  const isPageWithoutNavigationButtons =
    pagesWithoutNavigationButtons.includes(asPath);
  const isPageWithBottomBorder = pagesWithBottomBorder.includes(asPath);
  const isPageWithBottomBorderAndBackground =
    pagesWithBorderAndBackground.includes(asPath);

  const showNavigation = useAppSelector(selectShowNavigation);

  const [toggleMobileNavigation, setToggleMobileNavigation] = useState(false);

  useEffect(() => {
    dispatch(setShowNavigation(!isPageWithoutNavigationButtons));
  }, [isPageWithoutNavigationButtons, dispatch]);

  return (
    <HeaderWrapper
      id="header"
      $isPageWithBottomBorder={isPageWithBottomBorder}
      $isPageWithBottomBorderAndBackground={isPageWithBottomBorderAndBackground}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
        }}
      >
        <SimpleLogo />
        {!hideNavigation && (
          <Navbar
            onToggleMobileNavigation={setToggleMobileNavigation}
            toggleMobileNavigation={toggleMobileNavigation}
            showNavigation={showNavigation}
          />
        )}
      </Box>
    </HeaderWrapper>
  );
};

export default Header;
