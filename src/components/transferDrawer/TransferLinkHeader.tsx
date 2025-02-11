import {
  StyledHeaderImage,
  StyledHeaderImageContainer,
} from "@/app/(body)/project/projectBody.styles";
import theme from "@/styles/theme";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";

const TransferLinkHeader = () => {
  const { t } = useTranslation("workspaces");
  return (
    <Box>
      <StyledHeaderImageContainer>
        <StyledHeaderImage
          src="/img/transferLink.png"
          width="355"
          height="167"
          alt={t("workspaces.transfer.drawer.link.img.alt")}
          priority
        />
      </StyledHeaderImageContainer>
      <Typography
        variant="titleL"
        component="h3"
        sx={{
          padding: theme.spacing(3, 0, 0.5),
        }}
      >
        {t("workspaces.transfer.drawer.link.header")}
      </Typography>

      <Typography variant="bodyM" component="p" color="textSecondary">
        {t("workspaces.transfer.drawer.link.sub.header")}
      </Typography>
    </Box>
  );
};

export default TransferLinkHeader;
