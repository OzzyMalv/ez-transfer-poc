"use client";

import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { FC } from "react";
import { NAV_LINKS_TYPE } from "@/components/shared/navbar/LoggedOutNav";
import theme from "@/styles/theme";
import { usePathname, useRouter } from "next/navigation";
import setCurrentUrl, { getPreviousUrl } from "@/common/utils/setCurrentUrl";
import { useAppDispatch } from "@/store";
import { setShowNavigation } from "@/store/slices/settings.slice";
import routes from "@/common/constants/routes";
import LoggedOutNav from "@/components/shared/navbar/LoggedOutNav";

interface Props {
  onToggleMobileNavigation: (arg: boolean) => void;
  toggleMobileNavigation: boolean;
  showNavigation: boolean;
}

const Navbar: FC<Props> = ({
  onToggleMobileNavigation,
  toggleMobileNavigation,
  showNavigation,
}) => {
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const asPath = usePathname() || "";

  const navigate = () => {
    router.push(getPreviousUrl());
  };

  const renderDesktopNavigation = (links: NAV_LINKS_TYPE) => {
    if (showNavigation) {
      return links.map((link) => {
        const { component: Component } = link;
        return (
          <Component
            key={link.label}
            component={Link}
            href={link.linkTo}
            size="medium"
            data-testid={link.testId}
            data-analytics={`${link.id}`}
            sx={{
              fontSize: "15px",
              marginLeft:
                link.linkTo === routes.REGISTER ? theme.spacing(1.5) : 0,
            }}
            variant={link.variant}
            onClick={() => {
              setCurrentUrl(asPath);
            }}
          >
            {t(link.label)}
          </Component>
        );
      });
    }

    return (
      <IconButton
        onClick={() => {
          navigate();
          dispatch(setShowNavigation(true));
        }}
        sx={{ background: "rgba(85, 85, 85, 0.10)" }}
        data-testid="dti-close-menu"
        data-analytics="close-menu"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    );
  };

  return (
    <div data-testid="dti-navigation">
      <LoggedOutNav
        showNavigation={showNavigation}
        renderDesktopNavigation={renderDesktopNavigation}
        toggleMobileNavigation={toggleMobileNavigation}
        onToggleMobileNavigation={onToggleMobileNavigation}
      />
    </div>
  );
};

export default Navbar;
