import { Typography } from "@mui/material";
import React from "react";
import {
  EmptyReceivedTransfersIcon,
  EmptyReceivedTransfersWrapper,
} from "./receivedTransfers.styles";
import { useTranslation } from "react-i18next";

const EmptyReceivedTransfers: React.FC = () => {
  const { t } = useTranslation("received-transfers");
  return (
    <EmptyReceivedTransfersWrapper>
      <EmptyReceivedTransfersIcon />
      <Typography
        variant="titleL"
        color="primary"
        sx={{ paddingBottom: "8px" }}
      >
        {t("empty.content.header")}
      </Typography>
      <Typography variant="bodyM" color="textSecondary">
        {t("empty.content.subtitle")}
      </Typography>
    </EmptyReceivedTransfersWrapper>
  );
};
export default EmptyReceivedTransfers;
