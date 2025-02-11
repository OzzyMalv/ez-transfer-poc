"use client";

import { Badge, Box, Divider, Typography } from "@mui/material";
import theme from "@/styles/theme";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import {
  AvatarListStyled,
  BarWrapper,
  ListItemButtonStyled,
  ListWrapper,
  TrialChipStyled,
} from "@/components/shared/sidebar/sideBarWorkspaces.styles";
import SimpleLogo from "@/components/shared/logos/SimpleLogo";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectHasPrivateWorkspaceAccess,
  selectIsTrialsModalRequired,
  setShowTrialsModal,
} from "@/store/slices/auth.slice";
import { LockRounded } from "@mui/icons-material";
import { IWorkspace, setWorkspace } from "@/store/slices/workspace.slice";
import routes from "@/common/constants/routes";
import {
  requestWorkspaces,
  selectWorkspaces,
} from "@/store/slices/workspaces.slice";
import { usePathname, useRouter } from "next/navigation";

const AccountInfo = dynamic(() => import("@/components/sidenav/AccountInfo"), {
  ssr: false,
});

export interface Props {
  isCollapsedByDefault?: boolean;
  isOpenOnMobileOrTablet?: boolean;
  nameSpace: string;
}

const SideBarWorkspaces = ({
  isOpenOnMobileOrTablet = false,
  isCollapsedByDefault = false,
  nameSpace,
}: Props) => {
  const { t } = useTranslation(nameSpace);
  const dispatch = useAppDispatch();
  const isPrivateWorkspaceAllowed = useAppSelector(
    selectHasPrivateWorkspaceAccess,
  );
  const workspaces = useAppSelector(selectWorkspaces);
  const [isCollapsed, setIsCollapsed] = useState(isCollapsedByDefault);
  const pathname = usePathname();
  const router = useRouter();

  const isUpgrade = useAppSelector(selectIsTrialsModalRequired);

  useEffect(() => {
    if (workspaces.length === 0) {
      dispatch(requestWorkspaces());
    }
  }, []);

  const hoverOpenHandler = () => {
    if (isCollapsed) {
      setIsCollapsed(!isCollapsed);
    }
  };

  const hoverCloseHandler = () => {
    if (!isCollapsed && isCollapsedByDefault) {
      setIsCollapsed(!isCollapsed);
    }
  };

  useEffect(() => {
    if (workspaces.length !== 0) {
      dispatch(setWorkspace(workspaces[0]));
    }
  }, [workspaces]);

  const handleWorkspaceButton = (workspace: IWorkspace) => {
    dispatch(setWorkspace(workspace));

    if (pathname !== routes.WORKSPACES && !isUpgrade) {
      return router.push(routes.WORKSPACES);
    }

    if (isUpgrade) {
      return dispatch(setShowTrialsModal(true));
    }
  };

  const handleReceiversTransfers = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (isUpgrade) {
      event.preventDefault();
      return dispatch(setShowTrialsModal(true));
    }
    router.push(routes.RECEIVED_TRANSFERS);
  };

  return (
    <BarWrapper
      onMouseOver={hoverOpenHandler}
      onMouseLeave={hoverCloseHandler}
      $isCollapsed={isCollapsed}
      $isOpenOnMobileOrTablet={isOpenOnMobileOrTablet}
    >
      <Box flex={1} width="inherit">
        <Box
          display="flex"
          alignSelf="stretch"
          padding={theme.spacing(3, 2, 2, 2)}
        >
          <SimpleLogo />
        </Box>
        <ListWrapper>
          {workspaces.map((workspace, index) => (
            <ListItemButtonStyled
              selected={nameSpace === "workspaces" && !index}
              key={workspace.id}
              onClick={() => handleWorkspaceButton(workspace)}
              data-testid="my-workspace-btn"
              data-analytics="my-workspace-btn"
            >
              <AvatarListStyled>
                <Typography variant="bodyS">M</Typography>
              </AvatarListStyled>
              {!isCollapsed && (
                <>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={0.5}
                    flex={1}
                    minWidth={0}
                  >
                    <Typography
                      variant="bodyM"
                      noWrap
                      sx={{
                        color: isPrivateWorkspaceAllowed
                          ? "inherit"
                          : "#757677",
                      }}
                      title={workspace.name}
                    >
                      {workspace.name}
                    </Typography>
                    {!isPrivateWorkspaceAllowed && (
                      <LockRounded sx={{ color: "#999999", fontSize: 12 }} />
                    )}
                  </Box>
                  {isUpgrade && (
                    <TrialChipStyled
                      label={t("workspace.chip.upgrade")}
                      variant="outlined"
                      clickable={false}
                    />
                  )}
                </>
              )}
            </ListItemButtonStyled>
          ))}
        </ListWrapper>
        <Divider
          sx={{
            margin: theme.spacing(2, 0),
            width: "100%",
            borderColor: "#EEE",
          }}
        />
        <ListWrapper>
          <ListItemButtonStyled
            selected={nameSpace === "received-transfers"}
            data-testid="received-transfers-btn"
            data-analytics="received-transfers-btn"
            onClick={handleReceiversTransfers}
          >
            <Box display="flex" paddingLeft={0.25}>
              {!isCollapsed ? (
                <ListAltRoundedIcon fontSize="small" color="action" />
              ) : (
                <Badge
                  badgeContent={""}
                  color="primary"
                  overlap="circular"
                  variant="dot"
                >
                  <ListAltRoundedIcon fontSize="small" color="action" />
                </Badge>
              )}
            </Box>
            {!isCollapsed && (
              <Typography variant="bodyM" flex={1} noWrap>
                {t("sidenav.item.receivedTransfers")}
              </Typography>
            )}
          </ListItemButtonStyled>
        </ListWrapper>
      </Box>
      <AccountInfo isCollapsed={isCollapsed} />
    </BarWrapper>
  );
};

export default SideBarWorkspaces;
