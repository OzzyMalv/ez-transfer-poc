import React from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { MusicNoteRounded } from "@mui/icons-material";
import theme from "@/styles/theme";

const ContainerStyled = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacing(2)};
    background-color: rgba(250, 250, 250, 1);
    ${theme.breakpoints.up("xs")} {
      height: ${theme.spacing(24)};
    }
    ${theme.breakpoints.up("md")} {
      height: ${theme.spacing(60)};
      border-top-left-radius: ${theme.spacing(2)};
      border-top-right-radius: ${theme.spacing(2)};
    }
  }
`;

const IconContainerStyled = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${theme.palette.grey[400]};
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
    border-radius: ${theme.spacing(1)};
  }
`;

const AudioFilePreviewHolder: React.FC = () => {
  return (
    <ContainerStyled data-testid="audio-preview-holder-overlay">
      <IconContainerStyled>
        <MusicNoteRounded
          sx={{
            color: "#A8A8A8",
          }}
        />
      </IconContainerStyled>
    </ContainerStyled>
  );
};

export default AudioFilePreviewHolder;
