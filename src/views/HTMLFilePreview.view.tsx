import theme from "@/styles/theme";
import { Box, Link, Typography } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { Trans } from "next-i18next";
import { Preview } from "@/api/types/receiverUser.types";
import ImageFilePreview from "./ImageFilePreview.view";
import { useTranslation } from "next-i18next";
import NoPreviewHolder from "./NoPreviewHolder.view";

interface Props {
  smallProxyUrl: Preview["smallProxyUrl"];
  thumbnailUrl: Preview["largeThumbnailUrl"];
  fileName: string;
}

const HTMLFilePreview = ({ smallProxyUrl, thumbnailUrl, fileName }: Props) => {
  const { t } = useTranslation("receiverSessionFiles");

  return (
    <Box data-testid="dti-html5-preview" display="flex" flexDirection="column">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        sx={{
          border: "1px solid #ECECEC",
          borderRadius: theme.spacing(8),
          padding: theme.spacing(1, 1.5, 1, 1),
          width: "max-content",
          mb: theme.spacing(2),
        }}
        data-testid="dti-info-snackbar"
      >
        <Box
          display="flex"
          sx={{
            padding: "2px",
            borderRadius: "50%",
            backgroundColor: "#FDC61420",
            mr: theme.spacing(1),
          }}
        >
          <InfoRoundedIcon sx={{ color: "#FDC614", fontSize: "16px" }} />
        </Box>
        <Typography sx={{ typography: { xs: "bodyS", md: "bodyM" } }}>
          {thumbnailUrl && (
            <Trans t={t}>
              receiver_session_files.filePreview.html5.info.snackbar
              <Link
                href={smallProxyUrl!}
                underline="always"
                rel="noopener noreferrer"
                target="_blank"
                data-testid="dti-advalidation-link"
                data-analytics="advalidation-link"
                sx={{
                  fontWeight: 500,
                }}
              >
                link
              </Link>
            </Trans>
          )}
          {!thumbnailUrl && (
            <Trans t={t}>
              receiver_session_files.filePreview.html5.info.snackbar.no.gif
              <Link
                href={smallProxyUrl!}
                underline="always"
                rel="noopener noreferrer"
                target="_blank"
                data-testid="dti-advalidation-link"
                data-analytics="advalidation-link"
                sx={{
                  fontWeight: 500,
                }}
              >
                link
              </Link>
            </Trans>
          )}
        </Typography>
        <ArrowOutwardIcon
          sx={{
            ml: theme.spacing(0.5),
            fontSize: "14px",
          }}
        />
      </Box>
      {thumbnailUrl && (
        <ImageFilePreview thumbnailUrl={thumbnailUrl} fileName={fileName} />
      )}
      {!thumbnailUrl && (
        <NoPreviewHolder
          fileName={fileName}
          component={
            <>
              <Trans t={t}>
                receiver_session_files.filePreview.html5.info.snackbar.no.gif.preview
                <Link
                  href={smallProxyUrl!}
                  underline="always"
                  rel="noopener noreferrer"
                  target="_blank"
                  data-testid="dti-advalidation-link"
                  data-analytics="advalidation-link"
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  link
                </Link>
              </Trans>
              <ArrowOutwardIcon
                sx={{
                  ml: theme.spacing(0.5),
                  fontSize: "14px",
                }}
              />
            </>
          }
        />
      )}
    </Box>
  );
};

export default HTMLFilePreview;
