import { safetyAreas } from "@/common/constants/safetyAreas";
import { useAppDispatch } from "@/store";
import { setSafeAreaWidths } from "@/store/slices/receiver.slice";

interface AspectRatioWidthObject {
  id: string | number;
  width: number;
}

const safeAreaAdjustVideoSize = (
  videoRef: HTMLDivElement | null,
  dispatch: ReturnType<typeof useAppDispatch>,
) => {
  const container = videoRef;
  const safetyAreaWidths: AspectRatioWidthObject[] = [];

  if (!container) return;

  const containerWidth = container.offsetWidth;
  safetyAreas.forEach((platform) => {
    const aspectRatio = platform.aspectRatio.split(":");
    const containerHeight =
      (containerWidth * Number(aspectRatio[0])) / Number(aspectRatio[1]);
    const videoWidth =
      (containerHeight * Number(aspectRatio[0])) / Number(aspectRatio[1]);
    const widthObj = {
      id: platform.id,
      width: videoWidth,
    };

    safetyAreaWidths.push(widthObj);
  });

  dispatch(setSafeAreaWidths(safetyAreaWidths));
};

export default safeAreaAdjustVideoSize;
