import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  Checkbox,
  FormGroup,
  Grid,
  Link as MUILink,
  Menu,
  Typography,
} from "@mui/material";
import SelectAllRoundedIcon from "@mui/icons-material/SelectAllRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { safetyAreas } from "@/common/constants/safetyAreas";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  setSafeArea,
  setSafeAreaAll,
  selectSafeArea,
  selectSafeAreaAll,
} from "@/store/slices/receiver.slice";
import {
  StyledSafeAreaMenuContainer,
  StyledSafeAreaButton,
  StyledSafeAreaMenuItem,
  StyledFormControlLabelSafeArea,
} from "./safeAreaMenu.styles";
import theme from "../../styles/theme";
import Link from "next/link";
import {
  selectIsLoggedIn,
  selectIsTrialsModalRequired,
  setShowLoginModal,
  setShowTrialsModal,
} from "@/store/slices/auth.slice";
import routes from "@/common/constants/routes";

const SafeAreaMenu = () => {
  const { t } = useTranslation("receiverSessionFiles");
  const dispatch = useAppDispatch();
  const activeSafeArea = useAppSelector(selectSafeArea);
  const safeAreaAll = useAppSelector(selectSafeAreaAll);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);
  const isTrialsModalRequired = useAppSelector(selectIsTrialsModalRequired);

  const open = Boolean(anchorMenu);
  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    if (isTrialsModalRequired) {
      return await dispatch(setShowTrialsModal(true));
    }
    setAnchorMenu(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorMenu(null);
  };

  const handleMenuItemClick = (id: string) => () => {
    let safeAreaArray: string[];

    if (activeSafeArea.includes(id)) {
      safeAreaArray = activeSafeArea.filter((safeArea) => safeArea !== id);
    } else {
      safeAreaArray = [...activeSafeArea, id];
    }

    dispatch(setSafeArea(safeAreaArray));
  };

  const isSafeAreaChecked = (id: string) => {
    return activeSafeArea.includes(id);
  };

  const selectAllSafeAreas = () => {
    if (safeAreaAll) {
      dispatch(setSafeArea([]));
      return dispatch(setSafeAreaAll(false));
    }

    const allSafeAreas: string[] = [];
    dispatch(setSafeAreaAll(true));
    safetyAreas.forEach((area) => {
      allSafeAreas.push(area.id);
    });

    dispatch(setSafeArea(allSafeAreas));
  };

  const handleLoginClick = () => {
    dispatch(setShowLoginModal(true));
  };

  return (
    <StyledSafeAreaMenuContainer>
      <StyledSafeAreaButton
        id="safeAreaMenuButton"
        aria-controls={open ? "safeAreaMenu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlinedSquared"
        disableElevation
        onClick={handleClick}
        endIcon={<ArrowDropDownRoundedIcon />}
        startIcon={<SelectAllRoundedIcon />}
        data-analytics="safe-area-btn"
        data-testid="safe-area-btn"
      >
        {t("receiver_session_files.filePreview.safeAreaMenu.title")}
      </StyledSafeAreaButton>
      <Menu
        id="safeAreaMenu"
        MenuListProps={{
          "aria-labelledby": "safeAreaMenuButton",
          onMouseLeave: handleClose,
        }}
        anchorEl={anchorMenu}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: theme.spacing(32),
            borderRadius: theme.spacing(2),
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            marginTop: "10px",
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        data-testid="safe-area-menu"
      >
        <Grid container>
          <Grid item xs={12}>
            <StyledSafeAreaMenuItem>
              <Typography variant="labelS" color="textSecondary">
                {`${t(
                  "receiver_session_files.filePreview.safeAreaMenu.title",
                )} (beta)`}
              </Typography>
            </StyledSafeAreaMenuItem>
            {!isLoggedIn && (
              <Typography
                variant="bodyM"
                sx={{
                  padding: theme.spacing(0, 2),
                }}
                color="textSecondary"
              >
                <Trans t={t}>
                  receiver_session_files.filePreview.safeAreaMenu.login_or_signup
                  <MUILink
                    style={{
                      fontWeight: 500,
                      cursor: "pointer",
                      color: "black",
                    }}
                    underline="none"
                    onClick={handleLoginClick}
                    data-testid="dti-login"
                    data-analytics="login"
                  >
                    link1
                  </MUILink>
                  <Link
                    style={{
                      fontWeight: 500,
                      color: "black",
                    }}
                    href={routes.REGISTER}
                    data-testid="dti-signUp-link"
                    data-analytics="signUp-link"
                  >
                    link2
                  </Link>
                </Trans>
              </Typography>
            )}
          </Grid>
        </Grid>

        <FormGroup>
          <StyledFormControlLabelSafeArea
            key="selectAll"
            disabled={!isLoggedIn}
            control={<Checkbox size="small" checked={safeAreaAll} />}
            data-analytics="safe-area-select-all-btn"
            data-testid="safe-area-select-all-btn"
            label={
              <Typography
                variant="bodyM"
                color={isLoggedIn ? "" : "textSecondary"}
              >
                {t("receiver_session_files.filePreview.safeAreaMenu.all")}
              </Typography>
            }
            onChange={selectAllSafeAreas}
          />
          {safetyAreas.map((item) => (
            <StyledFormControlLabelSafeArea
              key={item.id}
              disabled={!isLoggedIn}
              control={
                <Checkbox size="small" checked={isSafeAreaChecked(item.id)} />
              }
              label={
                <Typography
                  variant="bodyM"
                  color={isLoggedIn ? "" : "textSecondary"}
                >
                  {item.title}
                </Typography>
              }
              onChange={handleMenuItemClick(item.id)}
              data-analytics={`safe-area-menu-item-${item.id}`}
              data-testid={`safe-area-menu-item-${item.id}`}
            />
          ))}
        </FormGroup>
      </Menu>
    </StyledSafeAreaMenuContainer>
  );
};

export default SafeAreaMenu;
