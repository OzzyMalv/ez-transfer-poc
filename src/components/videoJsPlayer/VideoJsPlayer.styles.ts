"use client";

import theme from "@/styles/theme";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { withTransientProps } from "@/styles/theme";

interface IDisplayHandler {
  $isAudio?: boolean;
}

interface IDoverlay {
  $overlay?: {
    right?: string;
    top?: string;
    bottom?: string;
    left?: string;
    zIndex: number;
    color: string;
    style: string;
    fontColor: string;
    labelPosition: string;
  };
}

interface IDAspectContainer {
  $width?: number;
}

export const StyledAspectRatioController = styled("div")`
  && {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
  }
`;

export const StyledAspectRatioContainer = styled(
  "div",
  withTransientProps,
)<IDAspectContainer>`
  && {
    height: 100%;
    width: ${(p) => p.$width}px;
    position: relative;
  }
`;

export const StyledSafeAreaWrapper = styled(
  "div",
  withTransientProps,
)<IDoverlay>`
  && {
    right: ${(p) => p.$overlay?.right ?? 0};
    top: ${(p) => p.$overlay?.top ?? 0};
    left: ${(p) => p.$overlay?.left ?? 0};
    position: absolute;
    z-index: ${(p) => p.$overlay?.zIndex ?? 1};
    pointer-events: none;
  }
`;

export const StyledSafeAreaText = styled(
  Typography,
  withTransientProps,
)<IDoverlay>`
  && {
    position: absolute;
    background: ${(p) => p.$overlay?.color ?? ""};
    padding: ${(p) => p.theme.spacing(0.25, 1)};
    color: ${(p) => p.$overlay?.fontColor ?? ""};
    border-radius: 15px;
    font-size: ${(p) => p.theme.typography.bodyM.fontSize};

    ${(p) =>
      p.$overlay?.labelPosition === "top" &&
      `
      top: -30px;
    `}
    @media screen and (max-width: 780px) {
      font-size: ${(p) => p.theme.typography.bodyS.fontSize};
    }
  }
`;
export const StyledSafeAreaImg = styled("img")`
  width: 100%;
  height: auto;
`;

export const StyledPlayer = styled("div")`
  && {
    position: relative;
  }
`;

export const StyledWrapperForVideoJsPlayer = styled(
  Box,
  withTransientProps,
)<IDisplayHandler>`
  && {
    .video-js .vjs-time-control {
      //font-family: ${(p) => p.theme.typography.fontFamily};
    }
    .video-js {
      ${(p) => p.$isAudio && `background-color: transparent`};
      ${theme.breakpoints.up("sm")} {
        border-radius: ${(p) => p.theme.spacing(2)};
      }
    }

    .vjs-text-track-display div {
      margin: 0 !important;
      display: none !important;
    }

    //* safe fixes for really big height in video
    .vjs-fluid:not(.vjs-audio-only-mode) {
      padding-top: 56%;
    }
    //*

    // for errors hide modal
    .video-js .vjs-modal-dialog {
      background: none;
    }

    .vjs-poster img {
      border-radius: ${(p) => p.theme.spacing(2)};
    }

    .video-js .vjs-tech {
      ${theme.breakpoints.up("sm")} {
        border-radius: ${(p) => p.theme.spacing(2)};
      }
    }

    .vjs-big-play-button {
      width: ${(p) => p.theme.spacing(8)};
      height: ${(p) => p.theme.spacing(8)};
      border-radius: 50%;
      border: 0;
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
      .vjs-icon-placeholder:before {
        position: relative;
        top: 3px;
        font-family: "Material Icons Round";
        content: "\e037";
        color: #262626;
      }
      background-color: rgba(255, 255, 255, 0.6);
    }
    video-js:hover {
      .vjs-big-play-button {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }

    .vjs-load-progress div {
      background-color: #adadad;
      border-radius: ${(p) => p.theme.spacing(1, 0, 0, 1)};
    }

    .vjs-control .vjs-slider {
      background-color: #dfdfdf;
    }
    .vjs-control {
      .vjs-progress-holder div,
      .vjs-play-progress,
      .vjs-volume-level,
      .vjs-slider {
        border-radius: ${(p) => p.theme.spacing(1)};
      }
    }

    .vjs-volume-level {
      ${(p) => p.$isAudio && `background-color: #212121`};
    }

    .vjs-play-progress.vjs-slider-bar {
      background-color: #a25ee8;
    }

    .vjs-error-display .vjs-modal-dialog-content {
      display: none;
    }

    .vjs-control-bar {
      background: transparent;
      z-index: 22222;
      margin-bottom: 4px;
    }

    .vjs-progress-control.vjs-control {
      position: absolute;
      width: 100%;
      bottom: ${(p) => p.theme.spacing(3)};
    }

    .vjs-button[title="Play"],
    .vjs-button.vjs-paused,
    .vjs-button.vjs-ended,
    .vjs-skip-backward,
    .vjs-skip-forward {
      .vjs-icon-replay:before,
      span:before {
        font-family: "Material Icons Round";
        ${(p) => p.$isAudio && `color: #212121`};
      }
    }

    .vjs-button[title="Pause"],
    .vjs-button.vjs-paused,
    .vjs-button.vjs-ended,
    .vjs-skip-backward,
    .vjs-skip-forward {
      .vjs-icon-replay:before,
      span:before {
        font-family: "Material Icons Round";
        ${(p) => p.$isAudio && `color: #212121`};
      }
    }
    .vjs-remaining-time.vjs-time-control.vjs-control {
      ${(p) => p.$isAudio && `color: #212121`};
    }

    /// font-family: "Material Icons Filled";
    //content: "\ef4a";

    .vjs-icon-fullscreen-enter:before,
    .video-js .vjs-fullscreen-control .vjs-icon-placeholder:before {
      font-family: "Material Icons Round";
      content: "\e5d0";
    }

    .vjs-picture-in-picture-control.vjs-control.vjs-button {
      margin-left: auto;
    }

    .vjs-icon-picture-in-picture-enter:before,
    .video-js .vjs-picture-in-picture-control .vjs-icon-placeholder:before {
      font-family: "Material Icons Round";
      content: "\e8aa";
    }

    .vjs-icon-volume-high:before,
    .video-js .vjs-mute-control .vjs-icon-placeholder:before {
      ${(p) => p.$isAudio && `color: #212121`};
      font-family: "Material Icons Round";
      content: "\e050";
    }

    .vjs-button[title="Pause"],
    .vjs-button.vjs-ended,
    .vjs-button.vjs-paused {
      .vjs-icon-replay:before,
      span:before {
        content: "\e034";
      }
    }

    .vjs-button[title="Play"],
    .vjs-button.vjs-ended,
    .vjs-button.vjs-paused {
      .vjs-icon-replay:before,
      span:before {
        content: "\e037";
      }
    }
    .vjs-skip-backward {
      cursor: pointer;

      span:before {
        content: "\e166";
      }
    }
    .vjs-skip-forward {
      cursor: pointer;
      span:before {
        content: "\e15a";
      }
    }

    .vjs-icon-circle:before,
    .vjs-seek-to-live-control .vjs-icon-placeholder:before,
    .video-js .vjs-volume-level:before,
    .video-js .vjs-play-progress:before {
      font-family: "Material Icons Round";
      content: "\ef62";
    }
  }
`;
