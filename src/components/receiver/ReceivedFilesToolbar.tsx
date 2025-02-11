"use client";

import {
  LeftToolbarBoxStyled,
  ListFilesToolbarBoxStyled,
} from "@/components/receiver/listFilesToolbar.styles";
import { useAppSelector } from "@/store";
import { Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useParams } from "next/navigation";
import { selectReceivedTransfer } from "@/store/slices/receivedTransfers.slice";
import { filesAndSize } from "@/common/utils/fileUtils";
import FileAnalyseButtonReceivedTransfer from "@/components/fileAnalyse/FileAnalyseButtonReceivedTransfer";

const ReceivedFilesToolbar = () => {
  const { t } = useTranslation("workspaces");
  const { receivedTransferId } = useParams<{
    receivedTransferId: string;
  }>();

  const transfer = useAppSelector((s) =>
    selectReceivedTransfer(s, receivedTransferId as string),
  );

  const allFilesAndSizeLabel = filesAndSize(
    transfer?.files?.length || 0,
    transfer?.totalFilesize || 0,
    t,
  );

  return (
    <ListFilesToolbarBoxStyled>
      <LeftToolbarBoxStyled>
        <Typography variant="bodyM" color="textSecondary">
          {allFilesAndSizeLabel}
        </Typography>
      </LeftToolbarBoxStyled>
      <FileAnalyseButtonReceivedTransfer files={transfer?.files} />
    </ListFilesToolbarBoxStyled>
  );
};

export default ReceivedFilesToolbar;
