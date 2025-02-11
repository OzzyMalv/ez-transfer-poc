import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import type Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";
import {
  StyledWrapperForVideoJsPlayer,
  StyledPlayer,
  StyledSafeAreaWrapper,
  StyledSafeAreaText,
  StyledAspectRatioController,
  StyledAspectRatioContainer,
  StyledSafeAreaImg,
} from "./VideoJsPlayer.styles";
import { safetyAreas } from "@/common/constants/safetyAreas";
import { useAppSelector, useAppDispatch } from "@/store";
import {
  selectSafeArea,
  selectSafeAreaWidths,
} from "@/store/slices/receiver.slice";

import safeAreaAdjustVideoSize from "@/common/utils/safeAreaAdjustVideoSize";

interface Props {
  // as from library itself
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  options: any;
  onReady: (player: Player) => void;
}

const VideoJsPlayer: React.FC<Props> = ({ options, onReady }) => {
  const dispatch = useAppDispatch();
  const activeSafeAreaIds = useAppSelector(selectSafeArea);
  const aspectWidths = useAppSelector(selectSafeAreaWidths);
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!playerRef.current) {
      const placeholderEl = videoRef.current;
      const videoElement = placeholderEl!.appendChild(
        document.createElement("video-js"),
      );

      const player = (playerRef.current = videojs(videoElement, options, () => {
        if (onReady) {
          onReady(player);
        }
      }));
    }
  }, [options, videoRef, onReady]);

  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef, options.sources[0].src]);

  useEffect(() => {
    const container = videoRef.current;

    handleResize(container);

    window.addEventListener("resize", () => handleResize(container));
    return () => {
      window.removeEventListener("resize", () => handleResize(container));
    };
  }, []);

  const handleResize = (container: HTMLDivElement | null) => {
    if (container) {
      safeAreaAdjustVideoSize(container, dispatch);
    }
  };

  const getAspectWidth = (id: string) => {
    const findAspectWidth = aspectWidths.filter(
      (platform) => platform.id === id,
    );

    return findAspectWidth[0].width;
  };

  const activeSafeAreas = () => {
    const matchedItems = safetyAreas
      .filter((area) => activeSafeAreaIds.includes(area.id))
      .map((area) => (
        <StyledAspectRatioController key={area.id}>
          <StyledAspectRatioContainer $width={getAspectWidth(area.id)}>
            <StyledSafeAreaWrapper $overlay={area.overlay}>
              <StyledSafeAreaImg
                src={`/img/safeAreas/${area.imgSrc}`}
                alt={`${area.title} safe area`}
                data-testid={`peach-go-safe-area-svg-${area.id}`}
                data-analytics={`peach-go-safe-area-svg-${area.id}`}
              />
              <StyledSafeAreaText $overlay={area.overlay}>
                {area.title}
              </StyledSafeAreaText>
            </StyledSafeAreaWrapper>
          </StyledAspectRatioContainer>
        </StyledAspectRatioController>
      ));

    return { matchedItems };
  };

  return (
    <StyledWrapperForVideoJsPlayer $isAudio={!!options.audioOnlyMode}>
      <StyledPlayer data-vjs-player>
        <div ref={videoRef}>
          {activeSafeAreaIds.length > 0 && activeSafeAreas().matchedItems}
        </div>
      </StyledPlayer>
    </StyledWrapperForVideoJsPlayer>
  );
};

export default VideoJsPlayer;
