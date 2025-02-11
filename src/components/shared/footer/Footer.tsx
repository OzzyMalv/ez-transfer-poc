import theme from "@/styles/theme";
import { Grid, Typography } from "@mui/material";
import { Trans, useTranslation } from "next-i18next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FooterContainer } from "./footer.styles";

export const Footer = () => {
  const { t } = useTranslation("footer");
  const pathName = usePathname();
  return (
    <FooterContainer
      container
      $pathName={pathName}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item sm={12} md={8}>
        <Typography sx={{ color: theme.palette.black["A100"] }}>
          <Trans t={t}>
            footer.copyright
            <Link
              style={{ textDecoration: "underline" }}
              href="https://www.peach.me/"
            >
              linkPeach
            </Link>
          </Trans>
        </Typography>
      </Grid>

      <Grid
        item
        sm={12}
        md={4}
        alignItems="center"
        display="flex"
        justifyContent="flex-end"
      >
        <Typography sx={{ color: theme.palette.black["A100"] }}>
          <Trans t={t}>
            footer.terms
            <Link href="https://www.peach.me/go/legal/">link1</Link>
          </Trans>
        </Typography>
        <Typography
          sx={{
            marginLeft: theme.spacing(2),
            color: theme.palette.black["A100"],
          }}
        >
          <Trans t={t}>
            footer.privacy
            <Link href="">link2</Link>
          </Trans>
        </Typography>
      </Grid>
    </FooterContainer>
  );
};
