"use client";
import { useAppSelector } from "@/store";
import styled from "@emotion/styled";
import { Typography, Fade } from "@mui/material";
import { useTranslation } from "next-i18next";
import { FC } from "react";

interface FullScreenDropZoneProps {
  isDragActive: boolean;
}

const FullScreenDropZone = styled.div<FullScreenDropZoneProps>`
  && {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: ${(p) => (p.isDragActive ? "#CFA4FF" : "#F9DC8F")};
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: ${(p) => (p.isDragActive ? 10000 : -1)};
  }
`;

const TextWrapper = styled.div`
  && {
    width: 402px;
  }
`;

export interface DropZoneProps {
  isDragActive: boolean;
}

const DropZone: FC<DropZoneProps> = ({ isDragActive }) => {
  const { t } = useTranslation("common");
  if (isDragActive) {
    return (
      <Fade in timeout={400}>
        <FullScreenDropZone
          data-testid="drop-zone"
          data-analytics="drop-zone"
          isDragActive={isDragActive}
        >
          <TextWrapper>
            <Typography variant="displayS" align="center">
              {t("drop_zone.heading")}
            </Typography>
            <Typography
              variant="bodyL"
              align="center"
              sx={{ paddingTop: "8px" }}
            >
              {t("drop_zone.text")}
            </Typography>
          </TextWrapper>
        </FullScreenDropZone>
      </Fade>
    );
  }

  return null;
};

export default DropZone;
