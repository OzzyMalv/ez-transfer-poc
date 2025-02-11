import { keyframes } from "@emotion/react";

export const pulseAnimation = keyframes({
  "0%": {
    boxShadow: "0 0 0 0 rgba(29, 24, 6, 0.4)",
  },
  "70%": {
    boxShadow: "0 0 0 28px rgba(22, 20, 14, 0)",
  },
  "100%": {
    boxShadow: " 0 0 0 0 rgba(204,169,44, 0)",
  },
});

export const slideInFromRightAnimation = keyframes({
  "0%": {
    transform: "translateX(100%)",
  },
  "100%": {
    transform: "translateX(0)",
  },
});

export const slideOutFromRightAnimation = keyframes({
  "0%": {
    transform: "translateX(0)",
  },
  "100%": {
    transform: "translateX(100%)",
  },
});

export const slideInFromBottomAnimation = keyframes({
  "0%": {
    transform: "translateY(100%)",
  },
  "100%": {
    transform: "translateY(0)",
  },
});

export const slideOutFromBottomAnimation = keyframes({
  "0%": {
    transform: "translateY(0)",
  },
  "100%": {
    transform: "translateY(100%)",
  },
});
