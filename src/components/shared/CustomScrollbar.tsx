import styled from "@emotion/styled";
import React, {
  FC,
  ForwardedRef,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

const ScrollBarContainer = styled("div")`
  display: flex;
  height: 100%;
  overflow: hidden;
  position: relative;

  .custom-scrollbars__content {
    height: inherit;
    -ms-overflow-style: none;
    overflow: auto;
    scrollbar-width: none;
    flex: 1;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .custom-scrollbars__scrollbar {
    display: flex;
    gap: 1rem;
    place-items: center;
    padding-top: ${(p) => p.theme.spacing(1)};
  }

  .custom-scrollbars__track-and-thumb {
    display: block;
    height: 100%;
    position: relative;
    width: ${(p) => p.theme.spacing(0.5)};
    margin-left: ${(p) => p.theme.spacing(1)};
  }

  .custom-scrollbars__track {
    background-color: transparent;
    border-radius: ${(p) => p.theme.spacing(1.5)};
    bottom: 0;
    cursor: pointer;
    position: absolute;
    top: 0;
    width: ${(p) => p.theme.spacing(0.5)};
  }

  .custom-scrollbars__thumb {
    border-radius: ${(p) => p.theme.spacing(1.5)};
    background-color: rgba(0, 0, 0, 0.15);
    position: absolute;
    width: ${(p) => p.theme.spacing(0.5)};
  }
`;

export interface ICustomScrollbar {
  children: JSX.Element | JSX.Element[];
  forwardedRef: ForwardedRef<HTMLDivElement | undefined>;
}

const CustomScrollbar: FC<ICustomScrollbar> = ({ children, forwardedRef }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = forwardedRef || contentRef;
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);
  const observer = useRef<ResizeObserver | null>(null);
  const [thumbHeight, setThumbHeight] = useState(20);
  const [scrollStartPosition, setScrollStartPosition] = useState<number | null>(
    null,
  );
  const [initialScrollTop, setInitialScrollTop] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleResize = (ref: HTMLDivElement, trackSize: number) => {
    const { clientHeight, scrollHeight } = ref;
    setThumbHeight(Math.max((clientHeight / scrollHeight) * trackSize, 20));
  };

  const containerRefCurrent = (
    containerRef as React.RefObject<HTMLDivElement | null>
  ).current;

  const handleTrackClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const { current: trackCurrent } = scrollTrackRef;
      const { current: contentCurrent } =
        containerRef as React.RefObject<HTMLDivElement | null>;
      if (trackCurrent && contentCurrent) {
        const { clientY } = e;
        const target = e.target as HTMLDivElement;
        const rect = target.getBoundingClientRect();
        const trackTop = rect.top;
        const thumbOffset = -(thumbHeight / 2);
        const clickRatio =
          (clientY - trackTop + thumbOffset) / trackCurrent.clientHeight;
        const scrollAmount = Math.floor(
          clickRatio * contentCurrent.scrollHeight,
        );
        contentCurrent.scrollTo({
          top: scrollAmount,
          behavior: "smooth",
        });
      }
    },
    [thumbHeight],
  );

  const handleThumbPosition = useCallback(() => {
    if (
      !containerRefCurrent ||
      !scrollTrackRef.current ||
      !scrollThumbRef.current
    ) {
      return;
    }
    const { scrollTop: contentTop, scrollHeight: contentHeight } =
      containerRefCurrent;
    const { clientHeight: trackHeight } = scrollTrackRef.current;
    let newTop = (+contentTop / +contentHeight) * trackHeight;
    newTop = Math.min(newTop, trackHeight - thumbHeight);
    const thumb = scrollThumbRef.current;
    thumb.style.top = `${newTop}px`;
  }, [containerRefCurrent?.scrollTop, containerRefCurrent?.scrollHeight]);

  const handleThumbMousedown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setScrollStartPosition(e.clientY);
      if (containerRefCurrent) {
        setInitialScrollTop(containerRefCurrent.scrollTop);
      }
      setIsDragging(true);
    },
    [],
  );

  const handleThumbMouseup = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isDragging) {
        setIsDragging(false);
      }
    },
    [isDragging],
  );

  const handleThumbMousemove = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isDragging && containerRefCurrent && scrollStartPosition) {
        const {
          scrollHeight: contentScrollHeight,
          offsetHeight: contentOffsetHeight,
        } = containerRefCurrent;

        const deltaY =
          (e.clientY - scrollStartPosition) *
          (contentOffsetHeight / thumbHeight);
        const newScrollTop = Math.min(
          initialScrollTop + deltaY,
          contentScrollHeight - contentOffsetHeight,
        );

        containerRefCurrent.scrollTop = newScrollTop;
      }
    },
    [isDragging, scrollStartPosition, thumbHeight, containerRefCurrent],
  );

  useEffect(() => {
    if (containerRefCurrent && scrollTrackRef.current) {
      const ref = containerRefCurrent;
      const { clientHeight: trackSize } = scrollTrackRef.current;
      observer.current = new ResizeObserver(() => {
        handleResize(ref, trackSize);
      });
      observer.current.observe(ref);
      ref.addEventListener("scroll", handleThumbPosition);
      return () => {
        observer.current?.unobserve(ref);
        ref.removeEventListener("scroll", handleThumbPosition);
      };
    }
  }, [handleThumbPosition]);

  useEffect(() => {
    document.addEventListener("mousemove", handleThumbMousemove);
    document.addEventListener("mouseup", handleThumbMouseup);
    document.addEventListener("mouseleave", handleThumbMouseup);
    return () => {
      document.removeEventListener("mousemove", handleThumbMousemove);
      document.removeEventListener("mouseup", handleThumbMouseup);
      document.removeEventListener("mouseleave", handleThumbMouseup);
    };
  }, [handleThumbMousemove, handleThumbMouseup]);

  return (
    <ScrollBarContainer>
      <div
        className="custom-scrollbars__content"
        ref={containerRef as React.Ref<HTMLDivElement>}
      >
        {children}
      </div>
      <div className="custom-scrollbars__scrollbar">
        <div className="custom-scrollbars__track-and-thumb">
          <div
            className="custom-scrollbars__track"
            ref={scrollTrackRef}
            onClick={handleTrackClick}
            style={{ cursor: isDragging ? "grabbing" : "default" }}
          ></div>
          <div
            className="custom-scrollbars__thumb"
            ref={scrollThumbRef}
            onMouseDown={handleThumbMousedown}
            style={{
              height: `${thumbHeight}px`,
              cursor: isDragging ? "grabbing" : "grab",
            }}
          ></div>
        </div>
      </div>
    </ScrollBarContainer>
  );
};

export default CustomScrollbar;
