"use client";

import {
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import { ChangeEvent, FC, useRef, useState } from "react";
import { HeaderWrapper } from "@/components/shared/headers/headerWorkspaces.styles";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SideBarWorkspaces from "@/components/shared/sidebar/SideBarWorkspaces";
import IconButtonMobile from "@/components/_adaptive/IconButtonMobile";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectHasPrivateWorkspaceAccess,
  selectUserPlan,
} from "@/store/slices/auth.slice";
import { LockRounded } from "@mui/icons-material";
import { Box } from "@mui/material";
import {
  selectWorkspace,
  setBasicTransfer,
} from "@/store/slices/workspace.slice";
import theme from "@/styles/theme";
import { addWorkspaceFiles } from "@/common/utils/fileUtils";
import { useRouter } from "next/navigation";
import AdaptiveShow from "@/components/_adaptive/AdaptiveShow";
import TrialCountdownButton from "@/components/shared/buttons/TrialCountdownButton";

export interface Props {
  nameSpace: string;
}

type Trials = {
  trial: {
    trialEndDate: string;
  };
};

const HeaderWorkspaces: FC<Props> = ({ nameSpace }) => {
  const { t } = useTranslation([nameSpace, "common"]);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isPrivateWorkspaceAllowed = useAppSelector(
    selectHasPrivateWorkspaceAccess,
  );
  const workspace = useAppSelector(selectWorkspace);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);
  const [toggleMobileNavigation, setToggleMobileNavigation] = useState(false);
  const plan = useAppSelector(selectUserPlan) as Trials;

  const handleClickMenu = () => {
    setToggleMobileNavigation(true);
  };

  const handleClickAdd = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAdd = () => {
    setAnchorEl(null);
  };

  const handleUploadFolders = () => {
    handleCloseAdd();
    if (uploadRef.current) {
      uploadRef.current.setAttribute("webkitdirectory", "");
      uploadRef.current.setAttribute("directory", "");
      dispatch(setBasicTransfer(true));
      uploadRef.current.click();
    }
  };

  const handleUploadFiles = () => {
    handleCloseAdd();
    if (uploadRef.current) {
      uploadRef.current.removeAttribute("webkitdirectory");
      uploadRef.current.removeAttribute("directory");
      dispatch(setBasicTransfer(true));
      uploadRef.current.click();
    }
  };

  const onFileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    await addWorkspaceFiles(
      dispatch,
      Array.from(e.target.files || []),
      workspace.id,
      workspace.rootFolderId,
      router,
    );

    if (uploadRef.current) uploadRef.current.value = "";
  };

  const createProjectButton = (label: string) => {
    return (
      <Button
        sx={{ height: "36px" }}
        variant="contained"
        size="medium"
        id="add-project"
        aria-label="add-project"
        aria-controls={!!anchorEl ? "more-button" : undefined}
        aria-expanded={!!anchorEl ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClickAdd}
        startIcon={<AddRoundedIcon />}
      >
        {t(label, {
          ns: "common",
        })}
      </Button>
    );
  };

  return (
    <>
      <HeaderWrapper id="header-workspaces">
        <IconButtonMobile
          icon={<MenuRoundedIcon />}
          onClick={handleClickMenu}
          data-testid="dti-mobile-menu"
        />
        <Box flex={1} display="flex" alignItems="center" gap={0.5}>
          <Typography
            variant="titleM"
            sx={{
              color: isPrivateWorkspaceAllowed ? "inherit" : "#757677",
            }}
            noWrap
          >
            {t("sidenav.list.item.page.title")}
          </Typography>
          {!isPrivateWorkspaceAllowed && (
            <LockRounded sx={{ color: "#999999", fontSize: "14px" }} />
          )}
        </Box>
        {/*// todo upload button component*/}

        {plan?.trial?.trialEndDate && <TrialCountdownButton />}

        {isPrivateWorkspaceAllowed && (
          <>
            <input
              type="file"
              hidden
              multiple
              ref={uploadRef}
              onChange={onFileInputChange}
            />
            {nameSpace === "workspaces" && (
              <AdaptiveShow
                mobileComponent={createProjectButton(
                  "header.btn.alt.newProject",
                )}
                desktopComponent={createProjectButton("header.btn.newProject")}
              />
            )}
            <Menu
              id="more-button"
              MenuListProps={{
                "aria-labelledby": "more-button",
                disablePadding: true,
              }}
              anchorEl={anchorEl}
              open={!!anchorEl}
              onClose={handleCloseAdd}
              PaperProps={{
                elevation: 0,
                sx: {
                  borderRadius: theme.spacing(1.5),
                  background: "#555",
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
            >
              <Box
                padding={2}
                borderBottom="1px solid rgba(180, 180, 180, 0.20);"
              >
                <Typography variant="bodyM" sx={{ color: "#FFFFFF" }}>
                  {t("sidenav.menu.text.uploadFilesForCreateProject")}
                </Typography>
              </Box>
              <Box padding={1}>
                <MenuItem sx={{ color: "#fff" }} onClick={handleUploadFiles}>
                  <ListItemIcon>
                    <img
                      src="/img/AddFileOutlinedWhite.svg"
                      alt="upload icon"
                    />
                  </ListItemIcon>
                  <Typography variant="bodyM">
                    {t("btn.upload.files")}
                  </Typography>
                </MenuItem>
                <MenuItem sx={{ color: "#fff" }} onClick={handleUploadFolders}>
                  <ListItemIcon>
                    <img
                      src="/img/AddFolderOutlinedWhite.svg"
                      alt="upload icon"
                    />
                  </ListItemIcon>
                  <Typography variant="bodyM">
                    {t("btn.upload.folders")}
                  </Typography>
                </MenuItem>
              </Box>
            </Menu>
          </>
        )}
      </HeaderWrapper>

      <SwipeableDrawer
        anchor="left"
        variant="temporary"
        open={toggleMobileNavigation}
        onOpen={() => setToggleMobileNavigation(true)}
        onClose={() => setToggleMobileNavigation(false)}
        PaperProps={{
          sx: { boxShadow: "none" },
        }}
        ModalProps={{
          keepMounted: false,
        }}
      >
        <SideBarWorkspaces
          isOpenOnMobileOrTablet={true}
          nameSpace={nameSpace}
        />
      </SwipeableDrawer>
    </>
  );
};

export default HeaderWorkspaces;
