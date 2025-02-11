"use client";

import styled from "@emotion/styled";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const AnimationOuterWrapper = styled("div")`
  && {
    width: 800px;
    height: 800px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
`;

const styles: React.CSSProperties = {
  position: "absolute",
  maxWidth: "60%",
  maxHeight: "60%",
  zIndex: "100",
};

const AnimationPageLoading = () => {
  return (
    <AnimationOuterWrapper>
      <DotLottieReact
        src="/lottie/loading-infinite-loop-logo-headline.json"
        loop
        autoplay
        renderConfig={{ autoResize: true }}
        style={styles}
        role="image"
        aria-label="Good to see you again! Just one moment - we're getting everything ready"
      />
    </AnimationOuterWrapper>
  );
};

export default AnimationPageLoading;
