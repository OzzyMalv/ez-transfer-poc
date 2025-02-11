"use client";

import routes from "@/common/constants/routes";
import setCurrentUrl from "@/common/utils/setCurrentUrl";
import {
  AccountMenu,
  AccountMenuInfo,
  AccountMenuInfoText,
  AccountWrapper,
  StyledExpandContainer,
  StyledLink,
  StyledNewTabIcon,
} from "@/components/sidenav/accountInfo.styles";
import { useAppSelector } from "@/store";
import {
  selectIsLoggedIn,
  selectUserEmail,
  selectUserFirstName,
  selectUserLastName,
  selectUserPayment,
} from "@/store/slices/auth.slice";
import theme from "@/styles/theme";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {
  ClickAwayListener,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import AccountInfoAvatar from "./AccountInfoAvatar";

export type AccountInfoProps = {
  isCollapsed: boolean;
};

const AccountInfo = ({ isCollapsed = false }: AccountInfoProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const authFirstName = useAppSelector(selectUserFirstName);
  const authLastName = useAppSelector(selectUserLastName);
  const authEmail = useAppSelector(selectUserEmail);
  const paymentId = useAppSelector(selectUserPayment);
  const { t } = useTranslation("sidenav");
  const pathName = usePathname();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const accountNavigation = () => {
    handleClose();
    setCurrentUrl(pathName);
  };

  useEffect(() => {
    if (isCollapsed) {
      handleClose();
    }
  }, [isCollapsed]);

  const NAV_LINKS = [
    {
      name: "settings",
      url: routes.ACCOUNT,
      onclick: accountNavigation,
      text: "sidenav.menu.item.settings",
      target: "_self",
      external: false,
      display: true,
    },
    {
      name: "about",
      url: "/",
      onclick: handleClose,
      text: "sidenav.menu.item.about",
      target: "_blank",
      external: true,
      display: true,
    },
    {
      name: "help",
      url: "/",
      onclick: handleClose,
      text: "sidenav.menu.item.help",
      target: "_blank",
      external: true,
      display: true,
    },
    {
      name: "plans",
      url: routes.ACCOUNT_PLANS,
      onclick: accountNavigation,
      text: "sidenav.menu.item.plans",
      target: "_self",
      external: false,
      display: !!paymentId,
    },
    {
      name: "contact",
      url: "/",
      onclick: handleClose,
      text: "sidenav.menu.item.contact",
      target: "_blank",
      external: true,
      display: true,
    },
  ];

  const iconStyles = {
    color: theme.palette.grey[700],
    fontSize: "15px",
  };

  const iconDisplay = (icon: string) => {
    if (icon === "settings") {
      return <SettingsOutlinedIcon sx={iconStyles} />;
    }

    if (icon === "plans") {
      return <SellOutlinedIcon sx={iconStyles} />;
    }

    if (icon === "about") {
      return <InfoOutlinedIcon sx={iconStyles} />;
    }

    if (icon === "help") {
      return <HelpOutlineOutlinedIcon sx={iconStyles} />;
    }

    if (icon === "contact") {
      return <MailOutlineRoundedIcon sx={iconStyles} />;
    }
  };

  return (
    <>
      {isLoggedIn && (
        <>
          {open && (
            <AccountMenu data-testid="dti-account-info-menu">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  <AccountMenuInfo>
                    <AccountInfoAvatar />

                    <AccountMenuInfoText>
                      {authFirstName && authLastName && (
                        <Typography
                          variant="labelS"
                          component="p"
                          title={`${authFirstName} ${authLastName}`}
                          noWrap
                          data-testid="dti-account-info-menu-name"
                        >
                          {authFirstName} {authLastName}
                        </Typography>
                      )}

                      <Typography
                        variant="bodyS"
                        flex={1}
                        title={authEmail}
                        noWrap
                        sx={{
                          color:
                            authFirstName && authLastName
                              ? theme.palette.black[800]
                              : theme.palette.grey[600],
                        }}
                      >
                        {authEmail}
                      </Typography>
                    </AccountMenuInfoText>
                  </AccountMenuInfo>

                  {NAV_LINKS.map((item) => (
                    <MenuItem
                      key={item.name}
                      sx={{
                        padding: 0,
                        display: item.display ? "flex" : "none",
                        height: "36px",

                        "&:hover": {
                          borderRadius: theme.spacing(1),
                        },
                      }}
                    >
                      <StyledLink
                        href={item.url}
                        onClick={item.onclick}
                        target={item.target}
                        data-testid={`dti-account-info-menu-link-${item.name}`}
                      >
                        <ListItemIcon>{iconDisplay(item.name)}</ListItemIcon>
                        <ListItemText>
                          <Typography
                            variant="bodyS"
                            paddingTop={theme.spacing(0.25)}
                          >
                            {t(item.text)}
                          </Typography>
                        </ListItemText>
                        {item.external && (
                          <Typography variant="bodyS">
                            <StyledNewTabIcon
                              sx={{
                                color: theme.palette.grey[700],
                                fontSize: "14px",
                              }}
                            />
                          </Typography>
                        )}
                      </StyledLink>
                    </MenuItem>
                  ))}
                  <Divider
                    sx={{
                      borderColor: theme.palette.grey[300],
                    }}
                  />
                  <MenuItem
                    sx={{
                      padding: 0,
                      "&:hover": {
                        borderRadius: theme.spacing(1),
                      },
                    }}
                  ></MenuItem>
                </MenuList>
              </ClickAwayListener>
            </AccountMenu>
          )}

          <AccountWrapper
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleOpen}
            data-testid="dti-account-info-open"
          >
            <AccountInfoAvatar />
            {!isCollapsed && (
              <>
                {authFirstName && authLastName ? (
                  <Typography
                    variant="titleS"
                    flex={1}
                    title={`${authFirstName} ${authLastName}`}
                    noWrap
                    data-testid="dti-account-info-name"
                  >
                    {authFirstName} {authLastName}
                  </Typography>
                ) : (
                  <Typography
                    variant="titleS"
                    flex={1}
                    textOverflow="ellipsis"
                    overflow="hidden"
                    noWrap
                    data-testid="dti-account-info-email"
                  >
                    {authEmail}
                  </Typography>
                )}

                <StyledExpandContainer>
                  {open ? (
                    <ExpandLessRoundedIcon
                      data-testid="dti-account-info-open-icon"
                      sx={{
                        fontSize: "16px",
                      }}
                    />
                  ) : (
                    <ExpandMoreRoundedIcon
                      fontSize="small"
                      data-testid="dti-account-info-closed-icon"
                      sx={{
                        fontSize: "16px",
                      }}
                    />
                  )}
                </StyledExpandContainer>
              </>
            )}
          </AccountWrapper>
        </>
      )}
    </>
  );
};

export default AccountInfo;
