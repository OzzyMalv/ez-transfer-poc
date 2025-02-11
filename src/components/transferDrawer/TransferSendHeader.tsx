import { StyledHeaderImageContainer } from "@/app/(body)/project/projectBody.styles";
import theme from "@/styles/theme";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import Image from "next/image";

interface TransferSendHeaderProps {
  transferStatus: string;
}
const TransferSendHeader = ({ transferStatus }: TransferSendHeaderProps) => {
  const { t } = useTranslation("workspaces");
  return (
    <Box>
      <StyledHeaderImageContainer>
        <Image
          src="/img/transferSent.svg"
          width="180"
          height="167"
          alt={t("workspaces.transfer.drawer.send.img.alt")}
          priority
        />
      </StyledHeaderImageContainer>
      {transferStatus !== "Complete" ? (
        <>
          <Typography
            variant="titleL"
            component="h3"
            sx={{
              padding: theme.spacing(3, 0, 0.5),
            }}
          >
            {t("workspaces.transfer.drawer.send.header")}
          </Typography>

          <Typography
            variant="bodyM"
            component="p"
            sx={{
              color: "rgba(0,0,0,0.6)",
            }}
          >
            {t("workspaces.transfer.drawer.send.sub.header")}
          </Typography>
        </>
      ) : (
        <>
          <Typography
            variant="titleL"
            component="h3"
            sx={{
              padding: theme.spacing(3, 0, 0.5),
            }}
          >
            {t("workspaces.transfer.drawer.sent.header")}
          </Typography>

          <Typography
            variant="bodyM"
            component="p"
            sx={{
              color: "rgba(0,0,0,0.6)",
            }}
          >
            {t("workspaces.transfer.drawer.sent.sub.header")}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default TransferSendHeader;
