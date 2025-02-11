"use client";

import { CircularProgress, Typography, useMediaQuery } from "@mui/material";

import { FC } from "react";

import { StatusButtonStyled } from "@/components/receiver/statusButton.styles";
import { useTranslation } from "next-i18next";
import theme from "@/styles/theme";

interface IStatusButtonProps {
  numberPercent: number;
  isFinalizing?: boolean;
}

const StatusButton: FC<IStatusButtonProps> = ({
  numberPercent,
  isFinalizing = false,
}) => {
  const { t } = useTranslation("workspaces");
  const isMobileOrTableDevice = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobileOrTableDevice) {
    return (
      <CircularProgress
        size={12}
        thickness={2}
        sx={{
          color: "rgba(38, 38, 38, 1)",
        }}
      />
    );
  }

  return (
    <StatusButtonStyled
      variant="outlined"
      disabled
      endIcon={
        <CircularProgress
          size={12}
          thickness={2}
          sx={{
            color: "rgba(38, 38, 38, 1)",
          }}
        />
      }
    >
      <Typography variant="bodyXS" color="textSecondary">
        {isFinalizing
          ? t("statusBtn.label.finalizing")
          : t("statusBtn.label.amountUploaded", { amount: numberPercent })}
      </Typography>
    </StatusButtonStyled>
  );
};

export default StatusButton;
