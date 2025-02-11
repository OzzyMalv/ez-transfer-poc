"use client";

import { ListItemButtonWrapper } from "@/app/(pages)/account/page.styles";
import routes from "@/common/constants/routes";
import BackButton from "@/components/shared/buttons/BackButton";
import theme from "@/styles/theme";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {
  Box,
  Divider,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { Trans, useTranslation } from "next-i18next";
import { usePathname, useRouter } from "next/navigation";
import {
  AccountPageLayoutWrapper,
  AccountSidebarSettings,
} from "./AccountPageLayout.styles";

const SIDE_NAV_ITEMS = [
  {
    name: "personalInfo",
    text: "account.tab.personal_info",
    url: routes.ACCOUNT,
    icon: PersonOutlineOutlinedIcon,
  },
  {
    name: "preferences",
    text: "account.tab.preferences",
    url: routes.ACCOUNT_PREFERENCES,
    icon: SettingsOutlinedIcon,
  },
] as const;

interface Props {
  children: JSX.Element | JSX.Element[];
}

const AccountPageLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation(["footer", "account"]);

  const footer = (
    <>
      <List>
        <ListItem disableGutters>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <Typography
            sx={{ color: theme.palette.black["A100"] }}
            variant="bodyS"
          >
            <Trans t={t}>
              footer.terms
              <Link
                href=""
                target="_blank"
                rel="noopener noreferrer"
                underline="always"
              >
                link1
              </Link>
            </Trans>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography
            sx={{
              color: theme.palette.black["A100"],
            }}
            variant="bodyS"
          >
            <Trans t={t}>
              footer.privacy
              <Link
                href=""
                rel="noopener noreferrer"
                target="_blank"
                underline="always"
              >
                link2
              </Link>
            </Trans>
          </Typography>
        </ListItem>
      </List>
    </>
  );

  return (
    <AccountPageLayoutWrapper>
      <AccountSidebarSettings
        paddingBottom={{
          xs: pathname.includes(routes.ACCOUNT_PREFERENCES)
            ? theme.spacing(2)
            : theme.spacing(8),
          md: theme.spacing(2),
        }}
      >
        <Box
          position={{ md: "fixed" }}
          top={0}
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
          height={{ md: "100%" }}
          width={{ xs: "100%", md: "auto" }}
        >
          <Box width={{ md: theme.spacing(28.75) }}>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              height={{ xs: theme.spacing(8), md: theme.spacing(10) }}
              width="100%"
              gap={1}
            >
              <BackButton backHref={routes.WORKSPACES} background={false} />
              <Typography variant="titleM">Settings</Typography>
            </Box>
            <List
              sx={{
                display: "flex",
                flexDirection: { xs: "row", md: "column" },
                width: "100%",
              }}
            >
              <ListSubheader
                sx={{
                  display: { xs: "none", md: "block" },
                }}
              >
                <Typography variant="titleS">
                  {t("account.navigation.subheader.title.Account", {
                    ns: "account",
                  })}
                </Typography>
              </ListSubheader>

              {SIDE_NAV_ITEMS.map((item) => (
                <ListItem
                  dense
                  sx={{
                    px: { xs: 0 },
                  }}
                  key={item.name}
                >
                  <ListItemButtonWrapper
                    $isActive={pathname == item.url}
                    onClick={() => router.push(item.url)}
                  >
                    <ListItemIcon>
                      <item.icon
                        sx={{
                          fontSize: "16px",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography variant="bodyS">
                        {t(item.text, { ns: "account" })}
                      </Typography>
                    </ListItemText>
                  </ListItemButtonWrapper>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box
            flex={1}
            sx={{
              paddingBottom: theme.spacing(4),
              display: { md: "none" },
              width: "100%",
            }}
          >
            {children}
          </Box>
          <Box display="flex" flexDirection="column">
            {footer}
          </Box>
        </Box>
      </AccountSidebarSettings>
      <Box
        flex={1}
        sx={{
          paddingBottom: theme.spacing(4),
        }}
        display={{ xs: "none", md: "block" }}
        height="fit-content"
      >
        {children}
      </Box>
    </AccountPageLayoutWrapper>
  );
};

export default AccountPageLayout;
