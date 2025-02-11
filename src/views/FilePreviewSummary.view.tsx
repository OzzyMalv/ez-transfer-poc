import React from "react";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { File, QcReportType } from "@/api/types/receiverUser.types";
import {
  FILE_PREVIEW_TYPE,
  getFilePreviewType,
} from "@/common/utils/fileUtils";
import theme from "@/styles/theme";

// with that id order in array
// todo resolution in video bugged bring back after BE fix 30, "31", 34, 44
const VIDEO_QC_SUMMARY_IDS = [2, 5, 14, 15, 17, 18, 19, 20, 27, 30, 34, 44];
const AUDIO_QC_SUMMARY_IDS = [2, 5, 26, 27, 30, 31, 44];
const IMAGE_QC_SUMMARY_IDS = [2, 5, 87, 88, 255];
const HTML_QC_SUMMARY_IDS = [2, 5];
const HTML_QC_SUB_SUMMARY_IDS = [1047, 1013, 1014];
const FALLBACK_QC_SUMMARY_IDS = [2, 5];

const FILE_TYPE_TO_QC = {
  video: VIDEO_QC_SUMMARY_IDS,
  audio: AUDIO_QC_SUMMARY_IDS,
  image: IMAGE_QC_SUMMARY_IDS,
  html: HTML_QC_SUMMARY_IDS,
} as const;

interface Props {
  fileType: ReturnType<typeof getFilePreviewType>;
  qcReport: File["qcReport"];
  qcSubReports: File["qcSubReports"];
}
const FilePreviewSummary: React.FC<Props> = ({
  fileType,
  qcReport,
  qcSubReports,
}) => {
  const setOfQcIdsBasedOnFileType =
    fileType !== FILE_PREVIEW_TYPE.UNKNOWN
      ? FILE_TYPE_TO_QC[fileType]
      : FALLBACK_QC_SUMMARY_IDS;

  const specificQcSet = setOfQcIdsBasedOnFileType.reduce(
    (acc, id) => {
      const neededQc = qcReport.find((qc) => qc.id === id);
      if (neededQc) {
        acc.push(neededQc);
      }
      return acc;
    },
    [] as File["qcReport"],
  );

  if (fileType === FILE_PREVIEW_TYPE.HTML) {
    qcSubReports.reduce((acc, qcSubReport) => {
      const neededQc = qcSubReport.report.filter((qc) => {
        return HTML_QC_SUB_SUMMARY_IDS.includes(qc.id);
      });

      if (neededQc.length) {
        acc.push(...neededQc);
      }
      return acc;
    }, specificQcSet);
  }

  const customFormattingForQc = (qc: QcReportType) => {
    switch (qc.id) {
      case 14:
        const playTime = Number(qc.value);
        return {
          id: qc.id,
          label: "Play Time",
          value: playTime > 1000 ? `${playTime / 1000} seconds` : qc.value,
        };
      case 34:
        return {
          id: qc.id,
          label: "Video Format",
          value: qc.value,
        };
      case 44:
        return {
          id: qc.id,
          label: "Audio Format",
          value: qc.value,
        };
      default:
        return {
          id: qc.id,
          label: qc.displayName || qc.display_name,
          value: qc.value || "",
        };
    }
  };

  const formattedQcSet = specificQcSet.map((qc) => customFormattingForQc(qc));

  return (
    <List sx={{ paddingTop: 0, paddingBottom: 0 }}>
      {formattedQcSet.map((formattedQc) => (
        <ListItem
          key={formattedQc.id}
          sx={{
            padding: theme.spacing(0.75, 0),
          }}
        >
          <ListItemText
            primary={
              <Box key={formattedQc.id} display="flex">
                <Typography
                  variant="bodyM"
                  color={"rgba(0, 0, 0, 0.87)"}
                  flex={1}
                >
                  {formattedQc.label}
                </Typography>
                <Typography variant="bodyM" flex={1}>
                  {formattedQc.value}
                </Typography>
              </Box>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default FilePreviewSummary;
