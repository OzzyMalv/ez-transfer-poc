import { Box, Chip, Card, CardContent, CardHeader } from "@mui/material";
import styled from "@emotion/styled";
import Image from "next/image";
import theme, { withTransientProps } from "@/styles/theme";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";

export const StyledVisualImg = styled(Image)`
  && {
    position: fixed;
    left: 4%;
    top: auto;
    bottom: -2%;
    margin: auto;
    ${theme.breakpoints.down("md")} {
      z-index: -1;
    }
  }
`;

export const VideoJsBoxStyled = styled(Box)`
  && {
    ${theme.breakpoints.down("md")} {
      margin: ${(p) => p.theme.spacing(0, -2)};
    }
  }
`;

export const StyledDesktopSafeAreaMenu = styled("div")`
  && {
    @media screen and (max-width: 780px) {
      display: none;
    }
  }
`;

export const StyledMobileSafeAreaMenu = styled("div")`
  display: none;
  margin: 0 ${(p) => p.theme.spacing(-2)};
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  padding-right: ${(p) => p.theme.spacing(1)};
  && {
    @media screen and (max-width: 780px) {
      display: block;
    }
  }
`;

interface IAnalyseIcon {
  $isShowingResults: boolean;
}

export const AnalyseIcon = styled(
  OfflineBoltIcon,
  withTransientProps,
)<IAnalyseIcon>`
  color: #34a853;

  border-radius: 50%;
  background-color: ${(p) => (p.$isShowingResults ? "none" : "#34a85333")};
  padding: 2px;
`;

export const AnalyseTrialChip = styled(Chip)`
  && {
    font-size: 11px;
    color: #8d50d8;
    background-color: rgba(160, 65, 255, 0.16);
    height: ${(p) => p.theme.spacing(2.75)};
    font-weight: bold;

    & .MuiChip-label {
      padding: ${(p) => p.theme.spacing(0, 0.75)};
    }
  }
`;

export const FilePreviewCard = styled(Card)`
  && {
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    box-shadow: none;
    padding: ${(p) => p.theme.spacing(1, 2)};
  }
`;

export const FilePreviewCardHeader = styled(CardHeader)`
  && {
    padding: ${(p) => p.theme.spacing(1.5, 0)};
  }
`;

export const FilePreviewCardContent = styled(CardContent)`
  && {
    padding: ${(p) => p.theme.spacing(0)};
  }
`;
