"use client";
import React, { useEffect } from "react";
import EmptyReceivedTransfers from "./EmptyReceivedTransfers";
import { useAppDispatch, useAppSelector } from "@/store";
import { requestGetReceivedTransfers } from "@/store/slices/receivedTransfers.slice";
import { ReceivedTransferBodyContentWrapper } from "./receivedTransfers.styles";
import HeaderWorkspaces from "@/components/shared/headers/HeaderWorkspaces";
import SideBarWorkspaces from "@/components/shared/sidebar/SideBarWorkspaces";
import { Box, useMediaQuery } from "@mui/material";
import theme from "@/styles/theme";
import {
  selectIsTrialsModalRequired,
  setShowTrialsModal,
} from "@/store/slices/auth.slice";

const ReceivedTransfersBody: React.FC = () => {
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const dispatch = useAppDispatch();
  const isUpgrade = useAppSelector(selectIsTrialsModalRequired);

  useEffect(() => {
    if (!isUpgrade) return;
    dispatch(setShowTrialsModal(true));
  }, [isUpgrade]);

  useEffect(() => {
    // Placeholder values for limit and offset
    dispatch(requestGetReceivedTransfers({ limit: 1000, offset: 0 }));
  }, [dispatch]);

  return (
    <Box height="100%">
      <SideBarWorkspaces
        isCollapsedByDefault={!isLargeDesktop}
        nameSpace="received-transfers"
      />
      <HeaderWorkspaces nameSpace="received-transfers" />
      <ReceivedTransferBodyContentWrapper>
        <EmptyReceivedTransfers />
      </ReceivedTransferBodyContentWrapper>
    </Box>
  );
};

export default ReceivedTransfersBody;
