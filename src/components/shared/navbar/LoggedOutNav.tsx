"use client";

import { Box, Button, ButtonProps, IconButton, Slide } from "@mui/material";
import {
  BurgerMenuBottomLine,
  BurgerMenuTopLine,
  BurgerMenuWrapper,
  MobileAuthNavigationWrapper,
  MobileWrapper,
} from "@/components/shared/navbar/navbar.styles";
import Link from "next/link";
import theme from "@/styles/theme";
import { ENV_CONSTANTS } from "@/common/constants/env.const";
import React, { ElementType, FC } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/navigation";
import routes from "@/common/constants/routes";

const ExternalButton = <C extends ElementType>(
  props: ButtonProps<C, { component?: C }>,
) => {
  return <Button {...props} target="_blank" rel="noopener noreferrer" />;
};

const NAV_LINKS = [
  {
    id: "about",
    linkTo: ENV_CONSTANTS.NEXT_PUBLIC_PEACH_ABOUT_URL || "",
    label: "app.header.buttons.about.text",
    testId: "dti_about_button",
    mobile: "top",
    variant: "text",
    mobileVariant: "text",
    component: ExternalButton,
  },
  {
    id: "help",
    linkTo: ENV_CONSTANTS.NEXT_PUBLIC_PEACH_FEEDBACK_URL || "",
    label: "app.header.buttons.help.text",
    testId: "dti_help_button",
    mobile: "top",
    variant: "text",
    mobileVariant: "text",
    component: ExternalButton,
  },
  {
    id: "pricing",
    linkTo: routes.PRICING,
    label: "app.header.buttons.pricing.text",
    testId: "dti_pricing_button",
    mobile: "top",
    variant: "text",
    mobileVariant: "text",
    component: Button,
  },
  {
    id: "login",
    linkTo: routes.LOGIN,
    label: "app.header.buttons.login.text",
    testId: "dti_login_button",
    mobile: "bottom",
    variant: "outlined",
    mobileVariant: "outlined",
    component: Button,
  },
  {
    id: "signup",
    linkTo: routes.REGISTER,
    label: "app.header.buttons.signup.text",
    testId: "dti_signup_button",
    variant: "contained",
    mobile: "bottom",
    mobileVariant: "contained",
    component: Button,
  },
] as const;

export type NAV_LINKS_TYPE = typeof NAV_LINKS;

interface Props {
  showNavigation: boolean;
  onToggleMobileNavigation: (arg: boolean) => void;
  toggleMobileNavigation: boolean;
  renderDesktopNavigation: (arg: NAV_LINKS_TYPE) => JSX.Element | JSX.Element[];
}

const LoggedOutNav: FC<Props> = ({
  showNavigation,
  renderDesktopNavigation,
  toggleMobileNavigation,
  onToggleMobileNavigation,
}) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const handleMobileNavigation = () => {
    if (!showNavigation) {
      router.push(routes.HOME);
    } else {
      onToggleMobileNavigation(!toggleMobileNavigation);
    }
  };

  const renderMobileNavbar = (location: "top" | "bottom") => {
    return NAV_LINKS.filter((nav) => nav.mobile === location).map((nav) => {
      const { component: Component } = nav;
      return (
        <Component
          key={nav.id}
          component={Link}
          href={nav.linkTo}
          size="medium"
          sx={{
            fontSize: "15px",
            px: `${location === "bottom" ? theme.spacing(2) : ""}`,
            py: `${location === "bottom" ? theme.spacing(1) : ""}`,
            my: `${location === "bottom" ? theme.spacing(1) : ""}`,
          }}
          fullWidth={location === "bottom"}
          variant={nav.mobileVariant}
          onClick={() => onToggleMobileNavigation(false)}
          data-testid={`${nav.testId}_mobile`}
          data-analytics={`${nav.id}_mobile`}
        >
          {t(nav.label)}
        </Component>
      );
    });
  };

  return (
    <>
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
        }}
      >
        {renderDesktopNavigation(NAV_LINKS)}
      </Box>
      <Box sx={{ display: { sm: "none" } }}>
        <IconButton
          sx={{
            background:
              toggleMobileNavigation || !showNavigation
                ? "rgba(0, 0, 0, 0.08) !important"
                : "rgba(42, 44, 47, 1) !important",
            zIndex: 21,
            width: "40px",
            height: "40px",
          }}
          data-testid={`${
            toggleMobileNavigation || !showNavigation
              ? "dti-burger-close-menu"
              : "dti-burger-open-menu"
          }`}
          onClick={handleMobileNavigation}
        >
          <BurgerMenuWrapper>
            <BurgerMenuTopLine
              $toggleMobileNavigation={
                toggleMobileNavigation || !showNavigation
              }
            />
            <BurgerMenuBottomLine
              $toggleMobileNavigation={
                toggleMobileNavigation || !showNavigation
              }
            />
          </BurgerMenuWrapper>
        </IconButton>
        <Slide
          in={toggleMobileNavigation}
          direction="right"
          mountOnEnter
          unmountOnExit
          timeout={350}
        >
          <MobileWrapper>
            {renderMobileNavbar("top")}
            <MobileAuthNavigationWrapper>
              {renderMobileNavbar("bottom")}
            </MobileAuthNavigationWrapper>
          </MobileWrapper>
        </Slide>
      </Box>
    </>
  );
};

export default LoggedOutNav;
