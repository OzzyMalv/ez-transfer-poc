"use client";

import {
  FileExtensionSelector,
  IconSelector,
} from "@/components/senderForm/senderForm.utils";
import theme from "@/styles/theme";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  fileName: string;
  component?: ReactElement;
}

const NoPreviewHolder = ({ fileName, component }: Props) => {
  const { t } = useTranslation("receiverSessionFiles");

  return (
    <Box
      data-testid="dti-no-preview-available"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FAFAFA",
        height: {
          xs: theme.spacing(24),
          sm: theme.spacing(50),
          md: theme.spacing(73),
        },
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          color: theme.palette.grey[700],
          bgcolor: theme.palette.grey[400],
          height: { xs: theme.spacing(5), md: theme.spacing(7) },
          width: { xs: theme.spacing(5), md: theme.spacing(7) },
          borderRadius: theme.spacing(1),
        }}
      >
        {IconSelector(FileExtensionSelector(fileName), false)}
      </Box>
      <Typography
        variant="bodyL"
        color={theme.palette.grey[600]}
        paddingTop={1}
      >
        {component
          ? component
          : t("receiver_session_files.filePreview.not.available")}
      </Typography>
    </Box>
  );
};

export default NoPreviewHolder;
