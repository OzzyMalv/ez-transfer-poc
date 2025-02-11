import { useAppSelector } from "@/store";
import { selectUserAuthProfile } from "@/store/slices/auth.slice";
import theme from "@/styles/theme";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import {
  Button,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useTranslation } from "next-i18next";

const AccountSecurity = () => {
  const { t } = useTranslation("account");
  const profileData = useAppSelector(selectUserAuthProfile);

  const handleChangePassword = async () => {};

  return (
    <>
      <List dense disablePadding>
        <ListItem alignItems="flex-start" disablePadding>
          <ListItemIcon>
            <MailOutlineRoundedIcon
              fontSize="small"
              sx={{
                color: theme.palette.grey[600],
              }}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="titleS" sx={{ fontSize: "13px" }}>
                {t("account.text.security.Email")}
              </Typography>
            }
            secondary={profileData.email}
          />
        </ListItem>
        <ListItem alignItems="flex-start" disablePadding>
          <ListItemIcon>
            <LockOutlinedIcon
              fontSize="small"
              sx={{
                color: theme.palette.grey[600],
              }}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="titleS" sx={{ fontSize: "13px" }}>
                {t("account.text.security.change_password")}
              </Typography>
            }
            secondary={t("account.text.security.changeassword_link_text")}
          />
          <Button
            sx={{
              height: theme.spacing(4),
              width: theme.spacing(10),
              alignSelf: "center",
            }}
            component={Link}
            onClick={handleChangePassword}
            variant="outlined"
            color="primary"
            size="large"
            disabled={false}
            data-testid="dti-change-password"
            data-analytics="account-security"
          >
            {t("account.text.security.Change")}
          </Button>
        </ListItem>
      </List>
    </>
  );
};

export default AccountSecurity;
